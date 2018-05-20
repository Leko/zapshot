/* global bench */
const assert = require('assert')
const fibonacci = require('./fibonacci')

bench('fibonacci(1)',
  () => assert.equal(fibonacci(1), 1)
)

bench('fibonacci(10)',
  () => assert.equal(fibonacci(10), 55)
)

bench('fibonacci(40)',
  () => assert.equal(fibonacci(40), 102334155)
)
