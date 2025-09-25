// copy from https://github.com/wand2016/yaml-schema

import fs from 'fs'
import yaml from 'js-yaml'
import { Command } from 'commander'
//import Ajv from 'ajv'
import Ajv2019 from 'ajv/dist/2019.js'
//import Ajv2020 from 'ajv/dist/2020.js'
import AjvErrors from 'ajv-errors'

const program = new Command();

(async() => {
  program.version('0.0.0')
    .requiredOption('-s, --schema <schemaPath>', 'schema YAML file path')
    .requiredOption('-i, --input  <inputPath>', 'input YAML file path')
    .option('-v, --verbose', 'verbose');

  program.parse();
  console.log('schema: ' + program.opts()['schema']);
  console.log('input: ' + program.opts()['input']);
  console.log('verbose: ' + program.opts()['verbose']);
  const verbose = program.opts()['verbose'];
  const schemaFile = fs.readFileSync(program.opts()['schema'], 'utf8')
  const inputFile = fs.readFileSync(program.opts()['input'], 'utf8')
  const schema = yaml.load(schemaFile)
  const input = yaml.load(inputFile)

  console.log(schema);
  console.log(input);

  //const ajv = new Ajv({allErrors: true, verbose: true});
  const ajv = new Ajv2019({allErrors: true, verbose: true});
  //const ajv = new Ajv2020({allErrors: true, verbose: true});
  AjvErrors(ajv);

  try {
    const validator = ajv.compile(schema);

    const validate_passed = validator(input);
    if (verbose) {
      console.log(JSON.stringify(validator.errors, null, "  "));
    } else {
      console.log(ajv.errorsText(validator.errors, {
        separator: '\n'
      }));
    }
    process.exit(validate_passed ? 0 : 1);
  } catch (e) {
    // invalid schema
    console.log('### Invalid schema ###');
    if (verbose) {
      console.log(e);
      console.log(JSON.stringify(ajv.errors, null, "  "));
    } else {
      console.log(ajv.errorsText(ajv.errors, {
        separator: '\n'
      }));
    }
    process.exit(1);
  }
})()
