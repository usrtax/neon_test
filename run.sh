#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

if [ -z "$1" ]; then
exe=lib/test.js
else
exe=$1
fi

bun run cep -- -c test -o lib
lib/test.js

