#!/bin/bash
set -eu
# This script installs the built packages in the local maven cache,
# meaning that we can build and run the most current definition dsl
# during tests



  # Check to see that we have a required binary on the path
  # and fail the script if it is not present
  function require_binary {
    if [ -z "${1:-}" ]; then
      error "${FUNCNAME[0]} requires an argument"
      exit 1
    fi

    if ! [ -x "$(command -v "$1")" ]; then
      error "The required executable '$1' is not on the path."
      exit 1
    fi
  }

require_binary jq

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running  
CURRENT_VERSION=$(jq -r .version $SCRIPT_DIR/../package.json)

echo "📦📦 Installing definition-dsl jar in maven local for v$CURRENT_VERSION"

mvn install:install-file \
  "-Dfile=$SCRIPT_DIR/../dist/java/io/contract-testing/contractcase/definitions/$CURRENT_VERSION/definitions-$CURRENT_VERSION.jar" \
  "-DpomFile=$SCRIPT_DIR/../dist/java/io/contract-testing/contractcase/definitions/$CURRENT_VERSION/definitions-$CURRENT_VERSION.pom"