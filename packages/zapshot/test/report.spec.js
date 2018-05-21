/* eslint-env jest */
import assert from "assert";
import { Nothing } from "nothing-mock";
import { Metrics } from "../src/metrics";
import { Report, diff } from "../src/report";

test("Report.fromMetricses can create Report without beforeMetrics", () => {
  const metricsA = new Metrics({
    metrics: {
      xxx: {
        name: "xxx",
        calls: [{ duration: 100 }, { duration: 300 }],
        markedCalls: {
          "xxx-1": [{ duration: 200 }, { duration: 200 }],
          "xxx-2": [{ duration: 100 }],
          "xxx-3": [{ duration: 10 }, { duration: 10 }, { duration: 100 }]
        }
      }
    }
  });
  const report = Report.fromMetricses(metricsA, null);

  assert.deepStrictEqual(
    report,
    new Report({
      xxx: {
        total: 400,
        mean: 200,
        diff: null,
        diffPercentage: null,
        marks: [
          {
            name: "xxx-1",
            total: 400,
            times: 2,
            diff: null,
            diffPercentage: null
          },
          {
            name: "xxx-3",
            total: 120,
            times: 3,
            diff: null,
            diffPercentage: null
          },
          {
            name: "xxx-2",
            total: 100,
            times: 1,
            diff: null,
            diffPercentage: null
          }
        ]
      }
    })
  );
});

test("Report.fromMetricses can create Report with beforeMetrics", () => {
  const metricsA = new Metrics({
    metrics: {
      xxx: {
        name: "xxx",
        calls: [{ duration: 1000 }, { duration: 3000 }],
        markedCalls: {
          "xxx-1": [{ duration: 2000 }, { duration: 2000 }],
          "xxx-2": [{ duration: 1000 }],
          "xxx-3": [{ duration: 100 }, { duration: 100 }, { duration: 1000 }]
        }
      }
    }
  });
  const metricsB = new Metrics({
    metrics: {
      xxx: {
        name: "xxx",
        calls: [{ duration: 100 }, { duration: 300 }],
        markedCalls: {
          "xxx-1": [{ duration: 200 }, { duration: 200 }],
          "xxx-2": [{ duration: 100 }],
          "xxx-3": [{ duration: 10 }, { duration: 10 }, { duration: 100 }]
        }
      }
    }
  });
  const report = Report.fromMetricses(metricsA, metricsB);

  assert.deepStrictEqual(
    report,
    new Report({
      xxx: {
        total: 4000,
        mean: 2000,
        diff: 3600,
        diffPercentage: 90,
        marks: [
          {
            name: "xxx-1",
            total: 4000,
            times: 2,
            diff: 3600,
            diffPercentage: 90
          },
          {
            name: "xxx-3",
            total: 1200,
            times: 3,
            diff: 1080,
            diffPercentage: 90
          },
          {
            name: "xxx-2",
            total: 1000,
            times: 1,
            diff: 900,
            diffPercentage: 90
          }
        ]
      }
    })
  );
});

test("diff returns null when b is null", () => {
  assert.strictEqual(diff(Nothing, null, m => m.hoge.foo.bar), null);
});

test("diff returns accessor(a) - accessor(b)", () => {
  assert.strictEqual(diff({ hoge: 10 }, { hoge: 100 }, m => m.hoge), -90);
});
