#!/bin/bash
set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running

# Copies proto files from the main repo, assumed to be ../contract-case
MAIN_REPO_LOCATION=$SCRIPT_DIR/../..

CONNECTOR_LOCATION="$MAIN_REPO_LOCATION/packages/case-connector"
CONNECTOR_PROTO_LOCATION="$MAIN_REPO_LOCATION/packages/case-connector-proto"

INSTALL_LOCATION=src/main/resources/io/contract_testing/contractcase/client/server
mkdir -p "$INSTALL_LOCATION"

cp "$CONNECTOR_PROTO_LOCATION/proto/contract_case_stream.proto" src/main/proto
cp "$CONNECTOR_LOCATION/package/"* "$INSTALL_LOCATION"

# Update the caseCoreVersion (may be a no-op)
#
# The regular expression matches semver:
# - `[0-9]+\.[0-9]+\.[0-9]+` : The basic major.minor.patch version
# - `(-[0-9A-Za-z\.-]+)?` : Optional pre-release version
# - `(\+[0-9A-Za-z\.-]+)?` : Optional build metadata 
CORE_VERSION_NUMBER=$(jq -r .version "$SCRIPT_DIR/../case-core/package.json")
sed -E 's/def caseCoreVersion = "([0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z\.-]+)?(\+[0-9A-Za-z\.-]+)?)?"/def caseCoreVersion = "'$CORE_VERSION_NUMBER'"/' "$SCRIPT_DIR/build.gradle" > "$SCRIPT_DIR/build.gradle.tmp" && mv "$SCRIPT_DIR/build.gradle.tmp" "$SCRIPT_DIR/build.gradle"
