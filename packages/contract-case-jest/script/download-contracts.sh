#!/bin/bash
set -eu

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running


PROVIDERS=("http response provider" "function definer" "http request provider" "function execution")

for PROVIDER in "${PROVIDERS[@]}"; do
    npx ContractCase download-contracts "$PROVIDER" --contract-dir="$SCRIPT_DIR"/../temp-contracts
done