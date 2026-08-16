#!/usr/bin/env bash

set -euo pipefail

first_manifest="$(mktemp)"
second_manifest="$(mktemp)"
trap 'rm -f "$first_manifest" "$second_manifest"' EXIT

npm run build
find build/_app/immutable -type f -print0 \
  | sort -z \
  | xargs -0 sha256sum \
  | sed 's#  build/#  #' > "$first_manifest"

npm run build
find build/_app/immutable -type f -print0 \
  | sort -z \
  | xargs -0 sha256sum \
  | sed 's#  build/#  #' > "$second_manifest"

if ! diff -u "$first_manifest" "$second_manifest"; then
  echo "Build is not reproducible: unchanged CSS/JS assets received different names or contents." >&2
  exit 1
fi

echo "Build is reproducible: immutable CSS/JS assets are unchanged."
