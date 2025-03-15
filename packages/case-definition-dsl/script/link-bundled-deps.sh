#!/bin/bash -eu
set -eu # We do this twice so that windows github runners will properly read them
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running  


BASE=$(realpath "$SCRIPT_DIR"/../../../node_modules/@contract-case)

echo "Finding in $BASE"

find "$BASE"/* -exec bash -c 'echo $0; mkdir -p '"$SCRIPT_DIR"/..'/node_modules/@contract-case/$(basename $0); cp -R "$0/"* '"$SCRIPT_DIR"'/../node_modules/@contract-case/$(basename "$0") 2>/dev/null; echo done' '{}' \;
