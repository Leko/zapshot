/* eslint-env jest */
import path from 'path'
import assert from 'assert'
import { args } from '../src/args'

test('Can pass --init', () => {
  assert.strictEqual(args.parse('--init').init, true)
})
test('Can set default value without --init', () => {
  assert.strictEqual(args.parse('').init, false)
})

test('Can pass --cache', () => {
  assert.strictEqual(args.parse('--cache ./hoge/foo/bar').cache, './hoge/foo/bar')
})
test('Can set default value without --cache', () => {
  assert.strictEqual(args.parse('').cache, path.join(process.cwd(), '.zapshotcache'))
})

test('Can pass --quiet', () => {
  assert.strictEqual(args.parse('--quiet').quiet, true)
})
test('Can set default value without --quiet', () => {
  assert.strictEqual(args.parse('').quiet, false)
})

test('Can pass --threshold', () => {
  assert.strictEqual(args.parse('--threshold 34').threshold, 34)
})
test('Can set default value without --threshold', () => {
  assert.strictEqual(args.parse('').threshold, 20)
})

test('Can pass --step', () => {
  assert.strictEqual(args.parse('--step 34').step, 34)
})
test('Can set default value without --step', () => {
  assert.strictEqual(args.parse('').step, 50)
})
