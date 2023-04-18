#!/bin/bash -eu
set -eu # We do this twice so that winadows github runners will properly read them
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
# shellcheck source=lib/robust-bash.sh
. "$SCRIPT_DIR"/lib/robust-bash.sh 

npm ci
npx lerna bootstrap

npx lerna run format:check
npx lerna run lint
npx lerna run build
npx lerna run test
