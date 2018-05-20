// @flow
import path from 'path'
import yargs from 'yargs'
import pkg from '../package.json'

export type CLIOptions = {|
  init: boolean,
  cache: string,
  step: number,
|}

const { _: [target], ...flags } = yargs
  .version(pkg.version)
  .option('init', {
    describe: 'i',
    describe: 'Create initial metrics',
    type: 'boolean',
  })
  .option('cache', {
    describe: 'c',
    describe: 'Path of before metrics',
    type: 'string',
    default: path.join(process.cwd(), '.zapshotcache'),
  })
  .option('quiet', {
    alias: 'q',
    describe: 'Report only summary',
    type: 'boolean',
    default: false,
  })
  .option('threshold', {
    alias: 't',
    describe: 'Percentage of least significant difference (LSD)',
    type: 'number',
    default: 20,
  })
  .option('step', {
    describe: 's',
    type: 'number',
    describe: 'Specify the number of iteration on each benchmark',
    default: 50,
  })
  .argv

export {
  target,
  flags,
}
