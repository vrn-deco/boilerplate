/*
 * @Author: Cphayim
 * @Date: 2020-11-05 14:57:58
 * @Description: 用户存储库
 */
import { EntityRepository } from 'typeorm'
import { MyRepository } from '../base/repository'
import { UserEntity } from '../entities/user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends MyRepository<UserEntity> {}
