import sortBy from "lodash/sortBy";
import { Metric } from "./metric";
import { Metrics } from "./metrics";
export type Case = {
  total: number;
  mean: number;
  diff: number | undefined | null;
  diffPercentage: number | undefined | null;
  marks: Array<{
    name: string;
    total: number;
    times: number;
    diff: number | undefined | null;
    diffPercentage: number | undefined | null;
  }>;
};
export class Report {
  cases: {
    [caseName: string]: Case;
  };

  static fromMetricses(
    metrics: Metrics,
    beforeMetrics: Metrics | undefined | null
  ): Report {
    const cases: {
      [caseName: string]: Case;
    } = metrics.getItems().reduce((acc, metric) => {
      const before: Metric | undefined | null = beforeMetrics
        ? beforeMetrics.getByName(metric.name)
        : null;
      const total = metric.getTotal();
      const totalDiff = diff(metric, before, m => m.getTotal());
      const marks = metric.getMarks().reduce((marks, mark) => {
        const subTotal = metric.getMarkedTotal(mark);
        const subTotalDiff = diff(metric, before, m => m.getMarkedTotal(mark));
        return marks.concat([
          {
            name: mark,
            total: subTotal,
            times: metric.getMarkedCount(mark),
            diff: subTotalDiff,
            diffPercentage: subTotalDiff ? subTotalDiff / subTotal * 100 : null
          }
        ]);
      }, []);
      return {
        ...acc,
        [metric.name]: {
          total: total,
          mean: metric.getMean(),
          diff: totalDiff,
          diffPercentage: totalDiff ? totalDiff / total * 100 : null,
          marks: sortBy(marks, mark => -mark.total)
        }
      };
    }, {});
    return new Report(cases);
  }

  constructor(cases: { [caseName: string]: Case }) {
    this.cases = cases;
  }
}
export const diff = (
  a: Metric,
  b: Metric | undefined | null,
  accessor: (a: Metric) => number
): number | undefined | null => {
  if (!b) {
    return null;
  }

  const aValue = accessor(a);
  const bValue = accessor(b);
  return aValue - bValue;
};
