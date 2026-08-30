#!/bin/bash
set -eu

# Load deployment settings from a gitignored .env file next to this script.
# Variables already set in the environment take precedence over the file.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
if [ -f "$ENV_FILE" ]; then
  set -o allexport
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +o allexport
fi

for required in DIST_DIR CASE_BUCKET_NAME CASE_DISTRIBUTION_ID; do
  if [ -z "${!required:-}" ]; then
    echo "❌ $required is not set. Set it in the environment or in $ENV_FILE (see .env.example)." >&2
    exit 1
  fi
done

# Cache most things for a day
echo "📤 Uploading static assets to S3 in $CASE_BUCKET_NAME..."
aws s3 sync "$DIST_DIR/" "s3://$CASE_BUCKET_NAME/" \
   --exclude "index.html" --exclude "404.html" \
   --size-only \
   --cache-control "public, max-age=86400"

# Upload the HTML last so clients never load the new HTML before the
# bundles it references are in place. Use cp (not sync) so it is always
# re-uploaded. no-cache lets browsers store it but forces revalidation on
# every navigation, so a new release is picked up on the next page load.
echo "📤 Uploading index.html and 404.html..."
aws s3 cp "$DIST_DIR/index.html" "s3://$CASE_BUCKET_NAME/index.html" \
  --cache-control "no-cache"
aws s3 cp "$DIST_DIR/404.html" "s3://$CASE_BUCKET_NAME/404.html" \
  --cache-control "no-cache"  

echo "🔄 Invalidating CloudFront distribution $CASE_DISTRIBUTION_ID..."
aws cloudfront create-invalidation \
  --distribution-id "$CASE_DISTRIBUTION_ID" \
  --paths "/*" \
  --region us-east-1 \
  --no-cli-pager
