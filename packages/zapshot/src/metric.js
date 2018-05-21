// @flow
import sumBy from "lodash/sumBy";
import meanBy from "lodash/meanBy";
import sortBy from "lodash/sortBy";

export type Call = {|
  +duration: number
|};

export type MetricProps = {|
  +name: string,
  +calls: Array<Call>,
  +markedCalls: { [name: string]: Array<Call> }
|};

export class Metric {
  +name: string;
  +calls: Array<Call>;
  +markedCalls: { [marker: string]: Array<Call> };

  constructor({ name, calls, markedCalls }: MetricProps) {
    this.name = name;
    this.calls = calls;
    this.markedCalls = markedCalls;
  }

  getTotal(): number {
    return sumBy(this.calls, "duration");
  }

  getMean(): number {
    return meanBy(this.calls, "duration");
  }

  getMarks(): Array<string> {
    return sortBy(
      Object.keys(this.markedCalls),
      mark => -this.getMarkedTotal(mark)
    );
  }

  getMarked(mark: string): ?Array<Call> {
    if (!this.markedCalls[mark]) {
      return null;
    }
    return this.markedCalls[mark];
  }

  getMarkedCount(mark: string): number {
    const marked = this.getMarked(mark);
    if (!marked) {
      return -1;
    }
    return marked.length;
  }

  getMarkedTotal(mark: string): number {
    const marked = this.getMarked(mark);
    if (!marked) {
      return -1;
    }
    return sumBy(marked, "duration");
  }

  getMarkedMean(mark: string): number {
    const marked = this.getMarked(mark);
    if (!marked) {
      return -1;
    }
    return meanBy(marked, "duration");
  }
}
