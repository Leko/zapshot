#!/usr/bin/env node
// @flow
import glob from "glob";
import chalk from "chalk";
import flatten from "lodash/flatten";
import _debug from "debug";
import { type Metric, Metrics, Report, measure, report } from "zapshot";
import { ProgressLogger } from "./progress-logger";
import { target, flags } from "./args";
import { load, save } from "./cache";

const main = async (targets, flags) => {
  debug("start measuring:", targets.length, "cases");
  const { step } = flags;
  const option = {
    step,
    progressLogger: new ProgressLogger()
  };
  const resultsList: Array<Array<Metric>> = [];
  for (let target of targets) {
    resultsList.push(await measure(target, option));
  }
  const metrics: Metrics = Metrics.fromArray(flatten(resultsList));
  const beforeMetrics: ?Metrics = load(flags);

  debug("start reporting:", metrics.length, "metrics");
  const reportOptions = {
    quiet: flags.quiet,
    threshold: flags.threshold
  };
  try {
    await report(Report.fromMetricses(metrics, beforeMetrics), reportOptions);
  } catch (error) {
    process.exit(1);
  }
  save(metrics, flags);
};

const debug = _debug("zapshot:cli");
const targets = glob.sync(target, { absolute: true });

debug("args:", targets);
debug("flags:", flags);
if (targets.length === 0) {
  console.error(chalk.yellow("No files specified")); // eslint-disable-line no-console
  process.exit(1);
}

main(targets, flags).catch(e => {
  console.error(chalk.red(e.stack)); // eslint-disable-line no-console
  process.exit(1);
});
