#!/bin/bash -eu
set -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running

####
# This script writes a package.json into the commonjs folder so that it's clear that it's CommonJS
####

DEST_DIR="$SCRIPT_DIR/../dist/cjs/package.json"

echo '{ "type": "commonjs" }' > "$DEST_DIR"

echo "[ ] Wrote package.json to $DEST_DIR"