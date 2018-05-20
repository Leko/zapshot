// @flow
import path from 'path'
import { performance, PerformanceObserver } from 'perf_hooks'
import { Progress, type Logger } from './progress'
import { Metric, type Call } from './metric'

// FIXME: Move to lib
type Option = {|
  +step: number,
  +progressLogger: Logger,
|}

type Queue = Array<{|
  name: string,
  setup: SetupFunction,
  fn: TestFunction,
|}>
type SetupFunction = (timerify: typeof performance.timerify) => any | Promise<any>
type TestFunction = (arg: any) => void | Promise<void>

export const measure = (target: string, option: Option): Promise<Array<Metric>> => {
  const queue: Queue = []
  global.bench = (name: string, setup: SetupFunction, fn: TestFunction) => {
    queue.push({
      name,
      fn: fn || setup,
      setup: fn ? setup : () => {},
    })
  }

  const run = async (queue: Queue): Promise<Array<Metric>> => {
    const metrics: Array<Metric> = []
    for (let { name, fn, setup } of queue) {
      const calls: Array<Call> = []
      const markedCalls: { [string]: Array<Call> } = {}

      const obs = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          markedCalls[entry.name] = markedCalls[entry.name] || []
          markedCalls[entry.name].push({ duration: entry.duration })
        })
      })
      obs.observe({ entryTypes: ['function'] })
      const arg = setup(performance.timerify)

      for (let i = 0; i < option.step; i++) {
        performance.clearMarks()
        performance.mark(`${name}-start`)
        await fn(arg)
        progress.tick()
        performance.mark(`${name}-end`)
        performance.measure(name, `${name}-start`, `${name}-end`)

        const [entry] = performance.getEntriesByName(name)
        calls.push({ duration: entry.duration })
      }

      obs.disconnect()
      performance.clearFunctions()

      metrics.push(new Metric({
        name,
        calls,
        markedCalls,
      }))
    }

    return metrics
  }

  // $FlowFixMe(allow-dynamic-require)
  require(target)

  const progress = new Progress(option.progressLogger)
  progress.setTotal(queue.length * option.step)
  progress.setTitle(path.relative(process.cwd(), target))
  progress.tick(0)

  return run(queue)
}
