// @flow
import fs from "fs";
import _debug from "debug";
import { Metrics } from "zapshot";
import { type CLIOptions } from "./args";

const debug = _debug("zapshot:cli");

export const load = (flags: CLIOptions): ?Metrics => {
  if (flags.init) {
    debug("Don't load before metrics because init option specified");
    return null;
  }
  if (!fs.existsSync(flags.cache)) {
    debug(`Can't load before metrics because '${flags.cache}' doesn't exists`);
    return null;
  }

  debug(`Try to load '${flags.cache}'`);
  const metricsMap = JSON.parse(fs.readFileSync(flags.cache, "utf8"));
  return new Metrics(metricsMap);
};

export const save = (metrics: Metrics, flags: CLIOptions): void => {
  if (!flags.init) {
    debug("Don't save current metrics because init option not specified");
    return;
  }

  debug(`Try to save ${flags.cache}`);
  fs.writeFileSync(flags.cache, JSON.stringify(metrics), "utf8");
};
