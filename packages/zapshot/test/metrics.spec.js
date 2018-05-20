/* eslint-env jest */
import assert from 'assert'
import { Metric } from '../src/metric'
import { Metrics } from '../src/metrics'

test('Metrics.fromArray can create Metrics', () => {
  const payload = [
    new Metric({
      name: 'xxx',
      calls: [{ duration: 100 }],
      markedCalls: {
        yyy: [{
          duration: 100,
        }],
      },
    })
  ]
  const expected = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [{ duration: 100 }],
        markedCalls: {
          yyy: [{
            duration: 100,
          }],
        },
      }
    },
  })
  const actual = Metrics.fromArray(payload)

  assert.deepStrictEqual(actual, expected)
})

test('Metrics can instantiate JSON serialized object', () => {
  const metrics = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [{ duration: 100 }],
        markedCalls: {
          yyy: [{
            duration: 100,
          }],
        },
      }
    },
  })

  const plain = JSON.parse(JSON.stringify(metrics))
  assert.deepStrictEqual(new Metrics(plain), metrics)
})

test('Metrics#length returns length of metrics', () => {
  const metrics = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [],
        markedCalls: {},
      },
      yyy: {
        name: 'yyy',
        calls: [],
        markedCalls: {},
      },
    },
  })
  assert.deepStrictEqual(metrics.length, 2)
})

test('Metrics#getItems returns all of metrics', () => {
  const metrics = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [],
        markedCalls: {},
      },
    },
  })

  assert.deepStrictEqual(metrics.getItems(), [
    new Metric({
      name: 'xxx',
      calls: [],
      markedCalls: {},
    }),
  ])
})

test('Metrics#getByName returns Metric when key exists', () => {
  const metrics = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [],
        markedCalls: {},
      },
    },
  })
  const expected = new Metric({
    name: 'xxx',
    calls: [],
    markedCalls: {},
  })

  assert.deepStrictEqual(metrics.getByName('xxx'), expected)
})

test('Metrics#getByName returns null when key not exists', () => {
  const metrics = new Metrics({
    metrics: {
      xxx: {
        name: 'xxx',
        calls: [],
        markedCalls: {},
      },
    },
  })
  assert.strictEqual(metrics.getByName('zzz'), null)
})
