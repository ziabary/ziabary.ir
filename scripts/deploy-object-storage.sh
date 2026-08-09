#!/usr/bin/env bash
set -euo pipefail

: "${S3_BUCKET:?Set S3_BUCKET}"
: "${S3_ENDPOINT:?Set S3_ENDPOINT}"
: "${S3_REGION:=auto}"

command -v aws >/dev/null || {
  echo "aws CLI is required" >&2
  exit 1
}

npm run build

aws s3 sync build/ "s3://${S3_BUCKET}/" \
  --endpoint-url "${S3_ENDPOINT}" \
  --region "${S3_REGION}" \
  --delete \
  --cache-control "public,max-age=3600"

aws s3 cp "s3://${S3_BUCKET}/" "s3://${S3_BUCKET}/" \
  --endpoint-url "${S3_ENDPOINT}" \
  --region "${S3_REGION}" \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --metadata-directive REPLACE \
  --content-type "text/html; charset=utf-8" \
  --cache-control "public,max-age=300"
