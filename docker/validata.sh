#!/bin/bash

#REPO=irslrepo_local/
REPO=repo.irsl.eiiris.tut.ac.jp/
DOCKER_IMAGE=${REPO}irslrepo_local/yaml_schema:latest

SCHEMA=$1
INFILE=$2

if [ ! -e "${SCHEMA}" ]; then
    echo "First argument (${SCHEMA}) should be exsinting file"
    exit 1
fi

if [ ! -e "${INFILE}" ]; then
    echo "Second argument (${INFILE}) should be exsinting file"
    exit 1
fi

docker run -v $(realpath $INFILE):/tmp/infile -v $(realpath $SCHEMA):/tmp/schema \
       ${DOCKER_IMAGE} \
       node /yaml_schema/yaml_validation.js -s /tmp/schema -i /tmp/infile
