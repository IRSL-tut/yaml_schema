// copy from https://github.com/wand2016/yaml-schema

import fs from 'fs'
import yaml from 'js-yaml'
import { Command } from 'commander'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'

const program = new Command();

(async() => {
  program.version('0.0.0')
    .requiredOption('-s, --schema <schemaPath>', 'schema YAML file path')
    .requiredOption('-i, --input  <inputPath>', 'input YAML file path')
  program.parse();
  console.log('schema: ' + program.opts()['schema']);
  console.log('input: ' + program.opts()['input']);
  const schemaFile = fs.readFileSync(program.opts()['schema'], 'utf8')
  const inputFile = fs.readFileSync(program.opts()['input'], 'utf8')
  const schema = yaml.load(schemaFile)
  const input = yaml.load(inputFile)

  console.log(schema);
  console.log(input);

  //const ajv = new Ajv({allErrors: true, jsonPointers: true})
  //const ajv = new Ajv({allErrors: true, jsPropertySyntax: true})
  const ajv = new Ajv({allErrors: true, verbose: true})
  AjvErrors(ajv)

  const passed = await ajv.validate(schema, input)

  console.log(ajv.errorsText(ajv.errors, {
    separator: '\n'
  }))

  process.exit(passed ? 0 : 1)
})()
