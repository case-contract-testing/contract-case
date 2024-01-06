#!/bin/bash -eu
set -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
# shellcheck source=../ci/lib/robust-bash.sh
. "$SCRIPT_DIR"/../ci/lib/robust-bash.sh 


# This tool exists because release-please doesn't correctly tag composite releases

VERSION=$1
SHA=$2

echo git tag @contract-case/case-core-v"$VERSION" "$SHA"
echo git tag @contract-case/case-example-mock-types-v"$VERSION" "$SHA"
echo git tag @contract-case/test-equivalence-matchers-v"$VERSION" "$SHA"
echo git tag @contract-case/case-entities-internal-v"$VERSION" "$SHA"
