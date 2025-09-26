#!/bin/bash

export MSYS_NO_PATHCONV=1 ## docker-desktop on gitbash

#REPO=irslrepo_local/
REPO=repo.irsl.eiiris.tut.ac.jp/
DOCKER_IMAGE=${REPO}yaml_schema:latest

INFILE=$1

if [ ! -e ${INFILE} ]; then
    echo "First argument (${INFILE}) should be exsinting file"
    exit 1
fi

TOPLEVEL=Top
SRC_LANG=schema
TGT_LANG=cpp

docker run -it --rm -v $(realpath $INFILE):/tmp/infile \
       ${DOCKER_IMAGE} \
       bash -c "quicktype --lang ${TGT_LANG} --top-level ${TOPLEVEL} --src /tmp/infile --src-lang ${SRC_LANG} -o /tmp/hoge.hpp; cat /tmp/hoge.hpp"
