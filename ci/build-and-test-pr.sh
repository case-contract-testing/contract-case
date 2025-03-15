#!/bin/bash -eu
set -eu # We do this twice so that windows github runners will properly read them
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
# shellcheck source=lib/robust-bash.sh
. "$SCRIPT_DIR"/lib/robust-bash.sh 

npm install # We can't do npm ci because lerna has optional dependencies :(

npx lerna --ci run format:check
npx lerna --ci run build
npx lerna --ci run lint
npx lerna --ci run test:local
npx lerna --ci run test:local:verify
