# Fibonacci optimization
Example for easy to understand zapshot concept.

> `zapshot` is compare diff between before execution and after rather than find fastest function.
> To help performance optimization in your products continuously.

## Usage and example output
```
$ cd example/fibonacci

$ zapshot --init suite.js

  fibonacci(1)
    Total: 29.72ms (mean: 0.59ms)

  fibonacci(10)
    Total: 3.52ms (mean: 0.07ms)

  fibonacci(40)
    Total: 59661.48ms (mean: 1193.23ms)

$ patch fibonacci.js < optimize.patch
patching file fibonacci.js

$ zapshot suite.js

  fibonacci(1)
    Total: 29.82ms (mean: 0.60ms) +0.11 ms (+0.36%)

  fibonacci(10)
    Total: 3.61ms (mean: 0.07ms) +0.09 ms (+2.38%)

  fibonacci(40)
    Total: 4.85ms (mean: 0.10ms) -59656.63 ms (-1231252.25%)
```

## Reference (Japanese)
I referred to this article to implement fastest approach:

> fib(n) ≒ φ ^ n /√5
>
> &mdash; [Fibonacci 関数のそれぞれの実装 - Qiita](https://qiita.com/VoQn/items/b2750322135a3cb0ca97)
