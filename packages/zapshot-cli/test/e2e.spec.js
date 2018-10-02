/* eslint-env jest */
import path from "path";
import assert from "assert";
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

afterAll(() => {
  spawnSync("git", ["checkout", main]);
});

test("Can initialize without error", () => {
  const { error, status } = spawnSync(bin, ["--init", suite]);
  expect(error).toBeUndefined();
  expect(status).toBe(0);
});
test("Can compare without error", () => {
  execSync(`patch ${main} < ${dir}${path.sep}optimize.patch`);

  const { error, status } = spawnSync(bin, ["--init", suite]);
  expect(error).toBeUndefined();
  expect(status).toBe(0);
});
