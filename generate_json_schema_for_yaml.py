#!/usr/bin/env python3

# copy from https://qiita.com/ssc-ksaitou/items/c5f580c70bd9c7e76b6c
import json
import yaml
from genson import SchemaBuilder
import argparse

def custom_tag_constructor(loader, node):
    return loader.construct_scalar(node)

# !vault などのYAMLタグのプロセッサを適当に定義する
yaml.SafeLoader.add_constructor('!vault', custom_tag_constructor)

def convert(src_yaml, dest_json, dump_json=False):
    with open(src_yaml, "r") as src_yml_file:
        yaml_data = yaml.safe_load(src_yml_file)
    builder = SchemaBuilder()
    builder.add_object(yaml_data)
    if not dest_json:
        if dump_json:
            import sys
            json.dump(builder.to_schema(), sys.stdout, indent=2)
        else:
            print( yaml.dump(builder.to_schema(), default_flow_style=False) )
        return
    with open(dest_json, "w") as file:
        if dump_json:
            json.dump(builder.to_schema(), file, indent=2)
        else:
            file.write(yaml.dump(builder.to_schema(), default_flow_style=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog="")
    parser.add_argument("-i", "--input", required=True)
    parser.add_argument("-o", "--output")
    parser.add_argument("-j", "--json", action="store_true")
    args = parser.parse_args()
    convert(args.input, args.output, args.json)
