#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

source "${SCRIPT_DIR}/../.env"
mkdir -p "$DOCKER_NPM_CACHE_FOLDER"
ENTRYPOINT_ARG=
RUN_ARGS="$@"
if [ $# -eq 0 ];  then
    ENTRYPOINT_ARG=--entrypoint ""
    RUN_ARGS=/bin/sh
fi

set -x
docker run --rm -it \
  --workdir /app \
  --volume "${DOCKER_NPM_CACHE_FOLDER}:/tmp/cache" \
  --env "npm_config_cache=/tmp/cache" \
  --volume "${SCRIPT_DIR}/../web:/app" \
  --user "$(id -u):$(id -g)" \
  ${ENTRYPOINT_ARG} \
  "${BASE_IMAGE_NODE}" \
  ${RUN_ARGS}
