import chalk from 'chalk'

export class Logger {
  static info(message) {
    Logger.print(chalk.blue(`[信息]: ${message}`))
  }
  static success(message) {
    Logger.print(chalk.green(`[完成]: ${message}`))
  }
  static error(message) {
    Logger.print(chalk.red(`[错误]: ${message}`))
  }
  static print(message) {
    process.stdout.write(message + '\n')
  }
}
