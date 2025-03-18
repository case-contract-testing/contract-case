#!/bin/bash
set -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running

####
# This script updates the core version in build gradle
####


# Update the caseCoreVersion (may be a no-op)
#
# The regular expression matches semver:
# - `[0-9]+\.[0-9]+\.[0-9]+` : The basic major.minor.patch version
# - `(-[0-9A-Za-z\.-]+)?` : Optional pre-release version
# - `(\+[0-9A-Za-z\.-]+)?` : Optional build metadata 
CORE_VERSION_NUMBER=$(jq -r .version "$SCRIPT_DIR/../case-core/package.json")
sed -E 's/def caseCoreVersion = "([0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z\.-]+)?(\+[0-9A-Za-z\.-]+)?)?"/def caseCoreVersion = "'$CORE_VERSION_NUMBER'"/' "$SCRIPT_DIR/build.gradle" > "$SCRIPT_DIR/build.gradle.tmp" && mv "$SCRIPT_DIR/build.gradle.tmp" "$SCRIPT_DIR/build.gradle"
