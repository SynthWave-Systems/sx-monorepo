#!/usr/bin/env bash

set -euo pipefail

echo "Running docker services"

docker-compose -f `dirname "$0"`/docker-compose.yml up -d

VITE_MANA_URL=http://localhost:3001 \
VITE_STARKNET_SEPOLIA_API=http://localhost:3000 \
VITE_EVM_OORT_TESTNET_API=http://ip:8000/subgraphs/name/snapshot-labs/sx-subgraph/ \
NETWORK=oorttestnet \
NETWORK_NODE_URL=http://dev-rpc.oortech.com \
turbo run dev
