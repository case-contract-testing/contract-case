#!/bin/bash -eu
set -eu # We do this twice so that windows github runners will properly read them
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
# shellcheck source=lib/robust-bash.sh
. "$SCRIPT_DIR"/lib/robust-bash.sh 

## This exists for Java's Code QL, which wants the build to be done

npm install # We can't do npm ci because lerna has optional dependencies :(

# First we have to build the definition-dsl, because it needs to be installed
# for java to build when there are breaking changes
npx lerna run build --scope @contract-case/case-definition-dsl
cd packages/dsl-java
npm run compile
