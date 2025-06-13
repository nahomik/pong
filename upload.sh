#!/bin/bash

VERSION=$1
AUTH="admin:nahom"  # or use $NEXUS_USER:$NEXUS_PASS if set securely
NEXUS_REPO="web-assets"

FILES=(src/*.html src/*.css src/*.js)

for FILE in "${FILES[@]}"; do
  BASENAME=$(basename "$FILE")
  echo "📤 Uploading $BASENAME to /pong/$VERSION/..."

  curl -u $AUTH --upload-file "$FILE" \
    "http://localhost:8081/repository/$NEXUS_REPO/pong/$VERSION/$BASENAME"
done

echo "✅ Uploaded version $VERSION to Nexus"
