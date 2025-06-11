#!/bin/bash

REPO_URL="http://localhost:8081/repository/web-assets/pong/v1.0"
AUTH="admin:nahom"

FILES=("index.html" "style.css" "game.js")

for FILE in "${FILES[@]}"; do
  echo "Uploading $FILE..."
  curl -u $AUTH --upload-file "$FILE" "$REPO_URL/$FILE"
done

echo "✅ Done uploading."
