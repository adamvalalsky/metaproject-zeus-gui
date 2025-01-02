#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

PROJECT="adamvalalsky/metaproject-zeus-gui"
IMAGE="web"
TAG="latest"

REGISTRY="ghcr.io"
FQIMAGE="${REGISTRY}/${PROJECT}/${IMAGE}:${TAG}"

docker build -t "${FQIMAGE}" -f ${SCRIPT_DIR}/../web/docker/prod/Dockerfile ${SCRIPT_DIR}/../web
docker login ${REGISTRY} -u adamvalalsky
docker push "${FQIMAGE}"