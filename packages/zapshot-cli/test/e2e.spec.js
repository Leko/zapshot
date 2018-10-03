/* eslint-env jest */
import path from "path";
import { execSync, spawnSync } from "child_process";

const bin = path.resolve(__dirname, "..", "dist", "cli.js");
const suite = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "examples",
  "fibonacci",
  "suite.js"
);
const dir = path.dirname(suite);
const main = `${dir}${path.sep}fibonacci.js`;

const assertRun = (bin, args) => {
  const { error, stderr, status } = spawnSync(bin, args, { encoding: "utf8" });
  // FIXME: `Warning: Possible perf_hooks memory leak detected` on Node.js 8.12.x
  const filteredSTDERR = stderr
    .trim()
    .split("\n")
    .filter(line => !line.includes("Possible perf_hooks memory leak detected"))
    .join("\n");
  expect(error).toBeUndefined();
  expect(filteredSTDERR).toBe("");
  expect(status).toBe(0);
};

afterAll(() => {
  spawnSync("git", ["checkout", main]);
});

test("Can initialize without error", () => {
  assertRun(bin, ["--init", suite]);
});
test("Can compare without error", () => {
  execSync(`patch ${main} < ${dir}${path.sep}optimize.patch`);
  assertRun(bin, ["--init", suite]);
});
