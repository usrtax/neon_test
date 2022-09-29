#!/usr/bin/env bash
set -e
DIR=$( dirname $(realpath "$0") )

cd $DIR

bun run concurrently -- -r\
  --kill-others \
  "watchexec --shell=none -w ./test  --exts coffee,js,mjs,json,wasm,txt,yaml  -r -- ./run.sh $@" \
  "watchexec --shell=none -w ./src --exts rs -r  -- cargo build"
