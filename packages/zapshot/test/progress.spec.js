/* eslint-env jest */
import assert from 'assert'
import sinon from 'sinon'
import { Nothing } from 'nothing-mock'
import { Progress } from '../src/progress'

let timer
beforeEach(() => {
  timer = sinon.useFakeTimers()
})
afterEach(() => {
  timer.restore()
})

test('Progress#total must be initialized with 0', () => {
  const progress = new Progress(Nothing)
  assert.strictEqual(progress.total, 0)
})

test('Progress#current must be initialized with 0', () => {
  const progress = new Progress(Nothing)
  assert.strictEqual(progress.current, 0)
})

test('Progress#title must be initialized with empty string', () => {
  const progress = new Progress(Nothing)
  assert.strictEqual(progress.title, '')
})

test('Progress#setTotal mutate total property', () => {
  const progress = new Progress(Nothing)
  progress.setTotal(100)
  assert.strictEqual(progress.total, 100)
})

test('Progress#setTitle mutate title property', () => {
  const progress = new Progress(Nothing)
  progress.setTitle('hoge foo bar')
  assert.strictEqual(progress.title, 'hoge foo bar')
})

test('Progress#tick +1 current property without argment', () => {
  const progress = new Progress(Nothing)
  progress.tick()
  assert.strictEqual(progress.current, 1)
})

test('Progress#tick increment current property with argment', () => {
  const progress = new Progress(Nothing)
  progress.tick(10)
  assert.strictEqual(progress.current, 10)
})

test('Progress#tick must call Logger#log with title, current, total and eta when current < total', () => {
  const logger = {
    log: sinon.stub(),
  }
  const progress = new Progress(logger)
  timer.tick(1000)
  progress.setTotal(10)
  progress.tick(5)

  assert.ok(logger.log.calledWith('', 5, 10, 1000))
})

test('Progress#tick must call Logger#tearDown with spent time when current >= total', () => {
  const logger = {
    tearDown: sinon.stub(),
  }
  const progress = new Progress(logger)
  timer.tick(1000)
  progress.setTotal(10)
  progress.tick(10)

  assert.ok(logger.tearDown.calledWith(1000))
})
