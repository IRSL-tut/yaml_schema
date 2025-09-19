#!/bin/bash

DOCKER_IMAGE=irslrepo_local/yaml_schema:latest

docker build . --no-cache -f Dockerfile -t ${DOCKER_IMAGE}
