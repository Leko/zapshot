// @flow
import { Metric, type MetricProps } from './metric'

export class Metrics {
  metrics: { [name: string]: Metric }

  static fromArray (metrics: Array<Metric>) {
    const metricsMap = {}
    for (let metric of metrics) {
      metricsMap[metric.name] = JSON.parse(JSON.stringify(metric))
    }

    return new Metrics({ metrics: metricsMap })
  }

  constructor ({ metrics }: { metrics: { [name: string]: MetricProps } }) {
    this.metrics = {}
    for (let name in metrics) {
      this.metrics[name] = new Metric(metrics[name])
    }
  }

  get length (): number {
    return Object.keys(this.metrics).length
  }

  getItems (): Array<Metric> {
    // $FlowFixMe(returns-array-of-Metric)
    return Object.values(this.metrics)
  }

  getByName (name: string): ?Metric {
    return this.metrics[name]
  }
}
