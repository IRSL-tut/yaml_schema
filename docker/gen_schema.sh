#!/bin/bash

export MSYS_NO_PATHCONV=1 ## docker-desktop on gitbash

#REPO=irslrepo_local/
REPO=repo.irsl.eiiris.tut.ac.jp/
DOCKER_IMAGE=${REPO}yaml_schema:latest

INFILE=$1
# OUTFILE=${2:-"/tmp/schema.yaml"}

#DUMP_JSON="--json"
DUMP_JSON=""

if [ ! -e ${INFILE} ]; then
    echo "First argument (${INFILE}) should be exsinting file"
    exit 1
fi

# if [ ! -e ${OUTFILE} ]; then
#     touch ${OUTFILE}
# fi

docker run --rm -v $(realpath $INFILE):/tmp/infile \
       ${DOCKER_IMAGE} \
       python3 /yaml_schema/generate_json_schema_for_yaml.py ${DUMP_JSON} -i /tmp/infile
