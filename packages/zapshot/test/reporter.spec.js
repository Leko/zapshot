/* eslint-env jest */
import assert from 'assert'
import sinon from 'sinon'
import chalk from 'chalk'
import { Report } from '../src/report'
import { report, indent, humanizeDiff } from '../src/reporter'

let spy
beforeEach(() => {
  spy = sinon.stub(console, 'log')
})
afterEach(() => {
  spy.restore()
})

test('report show summary in quiet mode', () => {
  const r = new Report({
    xxx: {
      total: 1000,
      mean: 200,
      diff: null,
      diffPercentage: null,
      marks: [{
        name: 'xxx-1',
        total: 800,
        times: 10,
        diff: null,
        diffPercentage: null,
      }],
    }
  })
  report(r, { quiet: true })
  assert.equal(spy.callCount, 1)
})

test('report show detail in non quiet mode', () => {
  const r = new Report({
    xxx: {
      total: 1000,
      mean: 200,
      diff: null,
      diffPercentage: null,
      marks: [{
        name: 'xxx-1',
        total: 800,
        times: 10,
        diff: null,
        diffPercentage: null,
      }],
    }
  })
  report(r, { quiet: false })
  assert.equal(spy.callCount, 3)
})

test('indent returns repeated space', () => {
  assert.strictEqual(indent(2), '  ')
  assert.strictEqual(indent(4), '    ')
})

test('humanizeDiff returns empty string when diff or diffPercentage are null', () => {
  assert.strictEqual(humanizeDiff(null, 100, null, {}), '')
  assert.strictEqual(humanizeDiff(100, null, null, {}), '')
})

test('humanizeDiff returns +-0 when diff is 0', () => {
  assert.ok(humanizeDiff(0, 10, null, {}).includes('+-0'))
})

test('humanizeDiff returns red string when diffPercentage >= threshold', () => {
  assert.ok(humanizeDiff(10, 10, null, { precision: 2, threshold: 10 }).includes(chalk.red('+10.00') + '%'))
  assert.ok(!humanizeDiff(10, 9, null, { precision: 2, threshold: 10 }).includes(chalk.red('+9.00') + '%'))
})

test('humanizeDiff returns green string when diffPercentage <= -threshold', () => {
  assert.ok(humanizeDiff(-10, -10, null, { precision: 2, threshold: 10 }).includes(chalk.green('-10.00') + '%'))
  assert.ok(!humanizeDiff(-10, -9, null, { precision: 2, threshold: 10 }).includes(chalk.green('-9.00') + '%'))
})
