// @flow

export interface Logger {
  log: (title: string, tick: number, total: number, eta: number) => void,
  tearDown: (spent: number) => void,
}

export class Progress {
  logger: Logger
  current: number
  total: number
  title: string
  startedAt: Date

  constructor (logger: Logger) {
    this.logger = logger
    this.total = 0
    this.current = 0
    this.title = ''
    this.startedAt = new Date()
  }

  setTotal (total: number) {
    this.total = total
  }

  setTitle (title: string) {
    this.title = title
  }

  tick (tick: number = 1) {
    this.current += tick
    const spent = new Date().getTime() - this.startedAt.getTime()

    if (this.current >= this.total) {
      this.logger.tearDown(spent)
    } else {
      const eta = spent / this.current * this.total - spent
      this.logger.log(this.title, this.current, this.total, eta)
    }
  }
}
