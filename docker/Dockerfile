ARG BASE_IMAGE=ubuntu:24.04
FROM ${BASE_IMAGE}

RUN if [ ! -e /etc/timezone ]; then \ 
    echo "Etc/UTC" > /etc/timezone && \ 
    ln -s /usr/share/zoneinfo/Etc/UTC /etc/localtime && \ 
    apt-get update && \ 
    apt-get install -q -y --no-install-recommends tzdata && \ 
    rm -rf /var/lib/apt/lists/* ; \ 
    fi

# install packages
RUN apt-get update -q -qq && \
    apt-get install -q -y --no-install-recommends \
    python3 python3-pip nodejs npm git && \
    python3 -m pip install --break-system-packages PyYAML genson && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /
RUN git clone https://github.com/IRSL-tut/yaml_schema.git

WORKDIR /yaml_schema
RUN npm install
