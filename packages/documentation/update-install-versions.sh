#!/bin/bash -eu
set -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running

CORE_VERSION_NUMBER=$(jq -r .version "$SCRIPT_DIR/../case-core/package.json")

sed "s/VERSION_HERE/$CORE_VERSION_NUMBER/g" "$SCRIPT_DIR/install-template-java.md" > "$SCRIPT_DIR/docs/examples/_install_java.mdx"