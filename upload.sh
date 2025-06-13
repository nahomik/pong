#!/bin/bash

VERSION=$1
NEXUS_URL="http://localhost:8081/repository/web-assets/"
AUTH="$NEXUS_USER:$NEXUS_PASS"

# Upload a dummy file at pong/ to make Nexus show the base folder
curl -s -u $AUTH --upload-file ./README.md "${NEXUS_URL}pong/README.md"

# Upload a dummy file at pong/$VERSION/ to make Nexus show version folder
curl -s -u $AUTH --upload-file ./README.md "${NEXUS_URL}pong/${VERSION}/README.md"

# Now upload actual files
FILES=(src/*.html src/*.css src/*.js)

for FILE in "${FILES[@]}"; do
  BASENAME=$(basename "$FILE")
  echo "📤 Uploading $BASENAME..."
  curl -s -u $AUTH --upload-file "$FILE" "${NEXUS_URL}pong/${VERSION}/${BASENAME}"
done

echo "✅ Uploaded version $VERSION"
