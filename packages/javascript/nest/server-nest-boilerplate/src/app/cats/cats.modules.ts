import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { Cat } from '../../entities/cat.entity'
import { CatMetadata } from '../../entities/cat-metadata.entity'
import { Master } from '../../entities/master.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatMetadata, Master])],
  controllers: [CatsController],
  providers: [CatsService],
  /**
   * 共享提供
   * 每个导入 CatsModule 的模块都可以访问 CatsService ，并且它们将共享相同的 CatsService 实例
   */
  exports: [CatsService],
})
export class CatsModule {}
