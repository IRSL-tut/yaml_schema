#!/bin/bash

#REPO=irslrepo_local/
REPO=repo.irsl.eiiris.tut.ac.jp/
DOCKER_IMAGE=${REPO}yaml_schema:latest

docker build . --no-cache -f Dockerfile -t ${DOCKER_IMAGE}
