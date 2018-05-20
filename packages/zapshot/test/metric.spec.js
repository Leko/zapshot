/* eslint-env jest */
import assert from 'assert'
import { Metric } from '../src/metric'

test('Metric can instantiate JSON serialized object', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [{ duration: 100 }],
    markedCalls: {
      yyy: [{
        duration: 100,
      }],
    },
  })

  const plain = JSON.parse(JSON.stringify(metric))
  assert.deepStrictEqual(new Metric(plain), metric)
})

test('Metric#getTotal returns sum of duration', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [{ duration: 100 }, { duration: 50 }, { duration: 300 }],
    markedCalls: {},
  })

  assert.strictEqual(metric.getTotal(), 450)
})

test('Metric#getMean returns mean of duration', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [{ duration: 100 }, { duration: 50 }, { duration: 300 }],
    markedCalls: {},
  })

  assert.strictEqual(metric.getMean(), 150)
})

test('Metric#getMarks returns all of marks', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }],
      bbb: [{ duration: 0 }],
      ccc: [{ duration: 0 }],
      zzz: [{ duration: 0 }],
    },
  })

  assert.deepStrictEqual(metric.getMarks(), ['aaa', 'bbb', 'ccc', 'zzz'])
})

test('Metric#getMarkedCount returns length of mark', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedCount('aaa'), 1)
})

test('Metric#getMarkedCount returns -1 when mark not exists', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedCount('xxx'), -1)
})

test('Metric#getMarkedTotal returns sum of durations', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }, { duration: 40 }, { duration: 120 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedTotal('aaa'), 160)
})

test('Metric#getMarkedTotal returns -1 when mark not exists', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedTotal('xxx'), -1)
})

test('Metric#getMarkedMean returns mean of durations', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }, { duration: 40 }, { duration: 120 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedMean('aaa'), 160 / 3)
})

test('Metric#getMarkedMean returns -1 when mark not exists', () => {
  const metric = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {
      aaa: [{ duration: 0 }],
    },
  })

  assert.deepStrictEqual(metric.getMarkedMean('xxx'), -1)
})
