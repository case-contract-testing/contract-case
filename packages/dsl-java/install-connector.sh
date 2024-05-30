#!/bin/bash
set -eu

# Copies proto files from the main repo, assumed to be ../contract-case
MAIN_REPO_LOCATION=../..

CONNECTOR_LOCATION="$MAIN_REPO_LOCATION/packages/case-connector"

cp "$CONNECTOR_LOCATION/proto/contract_case_stream.proto" src/main/proto
cp "$CONNECTOR_LOCATION/package/"* src/main/resources/io/contract_testing/contractcase/client/server
