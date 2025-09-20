# yaml_schema

YAML file schema using json schema

## Using Docker

### Build
``` bash
git clone https://github.com/IRSL-tut/yaml_schema.git
cd yaml_schema/docker
./build.sh
```

### Validation of YAML file
``` bash
cd yaml_schema/docker
./validate.sh ../samples/schema.yaml ../samples/input.yaml
./validate.sh ../samples/schema.yaml ../samples/input.fail.yaml
```

### Making Schema from YAML file
``` bash
cd yaml_schema/docker
./gen_schema.sh ../samples/input.yaml >> ../samples/gen_schema.yaml
./validate.sh ../samples/gen_schema.yaml ../samples/input.yaml
```

## LOACAL INSTALL

### install
``` bash
sudo apt update
sudo apt install python3 python3-pip nodejs npm git ## install pip and node.js
python3 -m pip install --break-system-packages PyYAML genson
git clone https://github.com/IRSL-tut/yaml_schema.git
cd yaml_schema
npm install
```

### Validation of YAML file
``` bash
cd yaml_schema
node /yaml_schema/yaml_validation.js -s samples/schema.yaml -i samples/input.yaml
```

### Making Schema from YAML file
``` bash
cd yaml_schema
./generate_json_schema_for_yaml.py -i samples/input.yaml >> samples/gen_schema.yaml
```
