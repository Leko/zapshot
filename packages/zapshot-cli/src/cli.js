#!/usr/bin/env node
import yargs from 'yargs'
import pkg from '../package.json'

const { _: argv, ...flags } = yargs
  .version(pkg.version)
  .option('init', {
    describe: 'Create initial metrics',
    type: 'boolean',
  })
  .argv

console.log(argv, flags)
