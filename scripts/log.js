import chalk from 'chalk'

export class Logger {
  static info(message, tip = '信息') {
    Logger.print(chalk.blue(`[${tip}]: ${message}`))
  }
  static exec(message, tip = '执行') {
    Logger.print(chalk.yellow(`[${tip}]: ${message}`))
  }
  static success(message, tip = '完成') {
    Logger.print(chalk.green(`[${tip}]: ${message}`))
  }
  static error(message, tip = '错误') {
    Logger.print(chalk.red(`[${tip}]: ${message}`))
  }
  static print(message) {
    process.stdout.write(message + '\n')
  }
}
