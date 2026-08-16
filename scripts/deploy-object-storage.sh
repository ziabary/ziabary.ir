#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

deploy_env="${DEPLOY_ENV_FILE:-$project_root/.env.deploy}"
if [[ -f "$deploy_env" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$deploy_env"
  set +a
fi

: "${S3_BUCKET:?Set S3_BUCKET}"
: "${S3_ENDPOINT:?Set S3_ENDPOINT}"
: "${S3_REGION:=auto}"
: "${AWS_ACCESS_KEY_ID:?Set AWS_ACCESS_KEY_ID}"
: "${AWS_SECRET_ACCESS_KEY:?Set AWS_SECRET_ACCESS_KEY}"

# ArvanCloud shows a public bucket URL such as
# https://ziabary.s3.ir-thr-at1.arvanstorage.ir in its panel, while AWS CLI
# expects the service endpoint without the bucket prefix. Accept either form.
bucket_endpoint_prefix="https://${S3_BUCKET}."
if [[ "$S3_ENDPOINT" == "${bucket_endpoint_prefix}"* ]]; then
  S3_ENDPOINT="https://${S3_ENDPOINT#"$bucket_endpoint_prefix"}"
fi

command -v aws >/dev/null || {
  echo "aws CLI is required" >&2
  exit 1
}

previous_output="$(mktemp -d)"
cleanup() {
  rm -rf "$previous_output"
}
trap cleanup EXIT

# Keep the timestamps of byte-identical output files. `aws s3 sync` compares
# size and modification time, so unchanged files from the previous successful
# local deployment are not uploaded again after Vite rebuilds the output tree.
if [[ -d build ]]; then
  mv build "$previous_output/build"
fi

if ! npm run build; then
  if [[ -d "$previous_output/build" && ! -e build ]]; then
    mv "$previous_output/build" build
  fi
  exit 1
fi

if [[ -d "$previous_output/build" ]]; then
  while IFS= read -r -d '' new_file; do
    relative_path="${new_file#build/}"
    old_file="$previous_output/build/$relative_path"
    if [[ -f "$old_file" ]] && cmp -s "$old_file" "$new_file"; then
      touch -r "$old_file" "$new_file"
    fi
  done < <(find build -type f -print0)
fi

# Content-hashed assets can stay in the CDN cache indefinitely. A changed file
# receives a different filename, so it cannot be confused with an old version.
aws s3 sync build/_app/immutable/ "s3://${S3_BUCKET}/_app/immutable/" \
  --endpoint-url "${S3_ENDPOINT}" \
  --region "${S3_REGION}" \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --only-show-errors

# Publish other files separately, excluding HTML and immutable assets.
aws s3 sync build/ "s3://${S3_BUCKET}/" \
  --endpoint-url "${S3_ENDPOINT}" \
  --region "${S3_REGION}" \
  --delete \
  --exclude "_app/immutable/*" \
  --exclude "*.html" \
  --cache-control "public,max-age=3600" \
  --only-show-errors

# HTML changes frequently and must point clients to the newest hashed assets.
# `sync` (unlike the old recursive `cp`) skips unchanged HTML files.
aws s3 sync build/ "s3://${S3_BUCKET}/" \
  --endpoint-url "${S3_ENDPOINT}" \
  --region "${S3_REGION}" \
  --delete \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public,max-age=300" \
  --only-show-errors
