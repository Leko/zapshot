const fibonacci = n => n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1)

// https://qiita.com/VoQn/items/b2750322135a3cb0ca97
const SQRT_5 = Math.sqrt(5)
const PHY = (1 + SQRT_5) / 2
// eslint-disable-next-line no-unused-vars
const optimizedFibonacci = n => Math.round(Math.pow(PHY, n) / SQRT_5)

module.exports = fibonacci
// module.exports = optimizedFibonacci
