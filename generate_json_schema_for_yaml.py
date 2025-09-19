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

# src_yml を読み込み dest_json に JSON Schema を出力する
def convert(src_yml, dest_json, dump_json=False):
    with open(src_yml, "r") as src_yml_file:
        yaml_data = yaml.safe_load(src_yml_file)
    builder = SchemaBuilder()
    builder.add_object(yaml_data)
    with open(dest_json, "w") as file:
        if dump_json:
            json.dump(builder.to_schema(), file, indent=2)
        else:
            file.write(yaml.dump(builder.to_schema(), default_flow_style=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog="")
    parser.add_argument("-i", "--input")
    parser.add_argument("-o", "--output")
    parser.add_argument("-j", "--json", action="store_true")
    args = parser.parse_args()
    convert(args.input, args.output, args.json)
