/*
 * @Author: Cphayim
 * @Date: 2019-08-20 17:02:12
 * @Description: 抽象存储库（所有存储库应当继承该类）
 */

import { NotFoundException } from '@nestjs/common'
import {
  AbstractRepository,
  DeepPartial,
  EntityManager,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'
import { MyEntity } from './entity'

/**
 * 抽象基本存储库
 * @export
 * @abstract
 * @class MyRepository
 * @extends {AbstractRepository<E>}
 * @template E 实体类型
 */
export abstract class MyRepository<E extends MyEntity> extends AbstractRepository<E> {
  getRepository(): Repository<E> {
    return this.repository
  }
  getManager(): EntityManager {
    return this.manager
  }
  // ========================== START: 重写存储库方法 ==============================

  /**
   * 创建一个或一组实体
   */
  create(): E
  create(entityLike: DeepPartial<E>): E
  create(entityLikeArray: Array<DeepPartial<E>>): E[]
  create(entityLikeOrentityLikes?: DeepPartial<E> | Array<DeepPartial<E>>): E | E[] {
    return this.repository.create(entityLikeOrentityLikes as any)
  }

  /**
   * 清空数据表
   */
  async clear(): Promise<void> {
    await this.repository.clear()
  }

  /**
   * 统计所有符合条件的数据的条数
   */
  async count(options?: FindManyOptions<E>): Promise<number> {
    return this.repository.count(this.setDefaultWhere(options))
  }

  /**
   * 通过实体删除数据（软删除）
   */
  async softRemove(entity: E): Promise<E>
  async softRemove(entities: E[]): Promise<E[]>
  async softRemove(entityOrEntities: E | E[]): Promise<E | E[]> {
    if (!entityOrEntities) {
      return entityOrEntities
    }
    entityOrEntities = Array.isArray(entityOrEntities)
      ? entityOrEntities.map(this.unActive)
      : this.unActive(entityOrEntities)
    return this.repository.save(entityOrEntities as any)
  }

  /**
   * 保存一个或一组实体到数据库
   */
  async save(entity: E): Promise<E>
  async save(entities: E[]): Promise<E[]>
  async save(entityOrEntities: E | E[]): Promise<E | E[]> {
    return this.repository.save(entityOrEntities as any)
  }

  /**
   * 查询所有符合条件的数据
   */
  async findAll(options?: FindManyOptions<E>): Promise<E[]> {
    return this.repository.find(this.setDefaultWhere(options))
  }

  /**
   * 查询所有符合条件的数据并返回条数
   */
  async findAllAndCount(options?: FindManyOptions<E>): Promise<[E[], number]> {
    return this.repository.findAndCount(this.setDefaultWhere(options))
  }

  /**
   * 查询 id 列表指定的所有数据
   */
  async findByIds(ids: string[] | number[], options?: FindManyOptions<E>): Promise<E[]> {
    return this.repository.findByIds(ids, this.setDefaultWhere(options))
  }

  /**
   * 查询符合条件的第一条数据
   */
  async findOne(options?: FindOneOptions<E>): Promise<E>
  async findOne(id?: string | number, options?: FindOneOptions<E>): Promise<E>
  async findOne(idOrOptions?: string | number | FindOneOptions<E>, maybeOptions?: FindOneOptions<E>): Promise<E> {
    const id = idOrOptions instanceof Object ? undefined : idOrOptions
    const options = idOrOptions instanceof Object ? idOrOptions : maybeOptions
    return this.repository.findOne(id, this.setDefaultWhere(options))
  }

  /**
   * 查询符合条件的第一条数据，如果找不到则抛出 Nest 404 异常
   */
  async findOneOr404(options?: FindOneOptions<E>): Promise<E>
  async findOneOr404(id?: string | number, options?: FindOneOptions<E>): Promise<E>
  async findOneOr404(idOrOptions?: string | number | FindOneOptions<E>, maybeOptions?: FindOneOptions<E>): Promise<E> {
    const entity = await this.findOne(idOrOptions as string | number, maybeOptions)
    if (!entity) {
      throw new NotFoundException(this.getNotFoundMessage())
    }
    return entity
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<E> {
    return this.repository.createQueryBuilder(alias)
  }
  // ========================== END: 重写存储库方法 ==============================

  // ========================== START: 工具函数 ===============================
  /**
   * 为选项设置默认的 where 条件来排除软删除数据（在没有手动指定 where.isActive 时）
   */
  private setDefaultWhere(options: FindOneOptions<E>): FindOneOptions<E> {
    const o = { ...options }
    // option.where 可能是数组，对象，undefined
    o.where = Array.isArray(o.where)
      ? o.where.map(this.processWhere) // 处理数组
      : this.processWhere(o.where as FindConditions<E>) // 处理对象和 undefined
    return o
  }

  /**
   * 为 where 对象添加排除软删除数据的选项（在没有手动指定 where.isActive 时）
   */
  private processWhere(whereItem: FindConditions<E>): FindConditions<E> {
    const defaultWhere = { isActive: true }
    return { ...defaultWhere, ...whereItem }
  }

  /**
   * 标记删除
   */
  private unActive(entity: E): E {
    entity.isActive = false
    return entity
  }

  /**
   * 获取 404 消息
   */
  protected getNotFoundMessage(): string {
    return `Not found the \`${this.repository.metadata.name}\``
  }
  // ========================== END: 工具函数 ===============================
}
