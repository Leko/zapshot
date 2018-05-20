# zapshot
JavaScript benchmarking tool.

`zapshot` is **compare diff between before execution and after** rather than find fastest function.
To help performance optimization in your products continuously.

Please refer [examples](https://github.com/Leko/zapshot/tree/master/examples/fibonacci) to help you to understand out concept.

## Install
```
npm i -g zapshot-cli
```

### Requirement
- Node.js 6+

## Usage
```
$ zapshot --help
Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --init           Create initial metrics                              [boolean]
  --cache          Path of before metrics
                                           [string] [default: "./.zapshotcache"]
  --quiet, -q      Report only summary                [boolean] [default: false]
  --threshold, -t  Percentage of least significant difference (LSD)
                                                          [number] [default: 20]
  --step           Specify the number of iteration on each benchmark
                                                          [number] [default: 50]
```

### Basic usage
```
zapshot --init benchmark.js # Create snapshot
# some optimization
zapshot benchmark.js # Compare with snapshot
```

If you want to update snapshots, please re-run `zapshot --init benchmark.js`.

## Contribution
1. Fork this repo
1. Create your branch like `fix-hoge-foo-bar` `add-hige`
1. Write your code
1. Pass all checks (`npm run lint && npm run flow && npm test`)
1. Commit with [gitmoji](https://gitmoji.carloscuesta.me/)
1. Submit pull request to `master` branch

## Development
```
git clone git@github.com:Leko/zapshot.git
cd zapshot
npm i
npm run bootstrap
```

## License
This package under [MIT](https://opensource.org/licenses/MIT) license.
