// @flow
/* eslint-disable no-console */
import maxBy from 'lodash/maxBy'
import chalk from 'chalk'
import { type Report, type Case } from './report'

export type ReportOptions = {|
  +precision?: number,
  +quiet: boolean,
  +threshold: number,
|}

export const report = (report: Report, { precision = 2, quiet, threshold }: ReportOptions): Promise<void> => {
  for (let caseName in report.cases) {
    const c: Case = report.cases[caseName]

    if (quiet) {
      console.log(`${caseName}: ${c.total.toFixed(precision)}ms (mean: ${c.mean.toFixed(precision)}ms) ${humanizeDiff(c.diff, c.diffPercentage, 'ms', { precision, threshold })}`)
    } else {
      const legend = `${indent(4)}Total`

      console.log(`\n${indent(2)}${caseName}`)
      console.log(`${legend}: ${c.total.toFixed(precision)}ms (mean: ${c.mean.toFixed(precision)}ms) ${humanizeDiff(c.diff, c.diffPercentage, 'ms', { precision, threshold })}`)

      const longestMark = maxBy(c.marks, mark => mark.name.length)
      const longestMarkWidth = longestMark ? longestMark.name.length : 0
      const totalMaxWidth = c.marks.length > 0 ? c.marks[0].total.toFixed(precision).length : 0
      for (let mark of c.marks) {
        const percentage = (mark.total / c.total * 100).toFixed(0).padStart(5)
        console.log(`${percentage.padStart(legend.length - 1)}% ${mark.name.padStart(longestMarkWidth)}: ${mark.total.toFixed(precision).padStart(totalMaxWidth)}ms (${mark.times} times) ${humanizeDiff(mark.diff, mark.diffPercentage, 'ms', { precision, threshold })}`)
      }
    }
  }

  return Promise.resolve()
}

export const indent = (num: number): string => ' '.repeat(num)

export const humanizeDiff = (diff: ?number, diffPercentage: ?number, unit?: string, { precision, threshold } : { precision: number, threshold: number }) => {
  const unitStr = unit ? ` ${unit}` : ''

  if (diff == null || diffPercentage == null) {
    return ''
  } else if (diff === 0) {
    return chalk.yellow('+-0')
  }

  const sign = diff > 0 ? '+' : ''
  let humanizedDiff = sign + diff.toFixed(precision)
  let humanizedPercentage = sign + diffPercentage.toFixed(precision)
  if (diffPercentage >= threshold) {
    humanizedDiff = chalk.red(humanizedDiff)
    humanizedPercentage = chalk.red(humanizedPercentage)
  } else if (diffPercentage <= -threshold) {
    humanizedDiff = chalk.green(humanizedDiff)
    humanizedPercentage = chalk.green(humanizedPercentage)
  }

  return `${humanizedDiff}${unitStr} (${humanizedPercentage}%)`
}
