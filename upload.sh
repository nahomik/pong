#!/bin/bash

VERSION=$1
NEXUS_URL="http://localhost:8081/repository/web-assets/pong/$VERSION"
AUTH="$NEXUS_USER:$NEXUS_PASS"

FILES=(src/*.html src/*.css src/*.js)

for FILE in "${FILES[@]}"; do
  BASENAME=$(basename "$FILE")
  echo "📤 Uploading $BASENAME..."
  curl -s -u $AUTH --upload-file "$FILE" "$NEXUS_URL/$BASENAME"
done

echo "✅ Uploaded version $VERSION"
