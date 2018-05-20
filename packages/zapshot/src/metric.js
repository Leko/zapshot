// @flow
import sumBy from 'lodash/sumBy'
import meanBy from 'lodash/meanBy'
import sortBy from 'lodash/sortBy'

export type Call = {|
  +duration: number,
|}

export type MetricProps = {|
  +name: string,
  +calls: Array < Call >,
  +markedCalls: { [name: string]: Array<Call> },
|}

export class Metric {
  +name: string
  +calls: Array<Call>
  +markedCalls: { [marker: string]: Array<Call> }

  constructor ({
    name,
    calls,
    markedCalls,
  }: MetricProps) {
    this.name = name
    this.calls = calls
    this.markedCalls = markedCalls
  }

  getTotal (): number {
    return sumBy(this.calls, 'duration')
  }

  getMean (): number {
    return meanBy(this.calls, 'duration')
  }

  getMarks (): Array<string> {
    return sortBy(Object.keys(this.markedCalls), mark => -this.getMarkedTotal(mark))
  }

  getMarkedCount (mark: string): number {
    if (!this.markedCalls[mark]) {
      return -1
    }
    return this.markedCalls[mark].length
  }

  getMarkedTotal (mark: string): number {
    if (!this.markedCalls[mark]) {
      return -1
    }
    return sumBy(this.markedCalls[mark], 'duration')
  }

  getMarkedMean (mark: string): number {
    if (!this.markedCalls[mark]) {
      return -1
    }
    return meanBy(this.markedCalls[mark], 'duration')
  }
}
