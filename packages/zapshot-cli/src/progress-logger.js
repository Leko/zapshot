// @flow
import { type Logger } from "zapshot";

export class ProgressLogger implements Logger {
  width: number;
  eraser: string;

  constructor() {
    // $FlowFixMe(stdout-has-columns)
    this.width = process.stdout.columns || 80;
    this.eraser = `\r${" ".repeat(this.width)}\r`;
  }

  log(title: string, tick: number, total: number, eta: number): void {
    const etaHumanized = (eta / 1000).toFixed(1);
    const restWidth =
      this.width -
      (title.length +
        String(tick).length +
        String(total).length +
        etaHumanized.length +
        7);
    const fillWidth = Math.round((restWidth / total) * tick);
    const fillBar = "█".repeat(fillWidth);
    const restBar = "░".repeat(restWidth - fillWidth);
    process.stdout.write(
      `${
        this.eraser
      }${title} ${fillBar}${restBar} [${tick}/${total}] ${etaHumanized}s`
    );
  }

  tearDown(): void {
    process.stdout.write(`${this.eraser}`);
  }
}
