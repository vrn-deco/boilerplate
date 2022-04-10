import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppService {
  private readonly logger = new Logger('TasksService')

  async getHello() {
    return 'Hello World!'
  }

  // 定时任务
  // @Cron(CronExpression.EVERY_10_SECONDS)
  // handleCron() {
  //   this.logger.debug('Called every 10 seconds')
  // }
}
