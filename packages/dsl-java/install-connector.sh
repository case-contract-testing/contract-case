#!/bin/bash
set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running

####
# This script copies in the built connector from the case-connector package
####

# Copies proto files from the main repo, assumed to be ../contract-case
MAIN_REPO_LOCATION=$SCRIPT_DIR/../..

CONNECTOR_LOCATION="$MAIN_REPO_LOCATION/packages/case-connector"
CONNECTOR_PROTO_LOCATION="$MAIN_REPO_LOCATION/packages/case-connector-proto"

INSTALL_LOCATION=src/main/resources/io/contract_testing/contractcase/client/server
mkdir -p "$INSTALL_LOCATION"

cp "$CONNECTOR_PROTO_LOCATION/proto/contract_case_stream.proto" src/main/proto
cp "$CONNECTOR_LOCATION/package/"* "$INSTALL_LOCATION"

