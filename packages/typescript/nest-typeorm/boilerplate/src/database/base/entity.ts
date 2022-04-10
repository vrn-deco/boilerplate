/*
 * @Author: Cphayim
 * @Date: 2019-08-16 09:50:54
 * @Description: 抽象实体类（所有实体应当继承该类）
 */
import { ExcludeToJson } from '@/libs/decorator'
import { BaseEntity, BeforeRemove, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

/**
 * 基本实体
 * @export
 * @class MyEntity
 * @extends {BaseEntity}
 */
export class MyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    comment: '创建时间',
    name: 'create_time',
    // select: false,
  })
  @ExcludeToJson()
  createTime: Date

  @UpdateDateColumn({
    comment: '更新时间',
    name: 'update_time',
    // select: false,
  })
  @ExcludeToJson()
  updateTime: Date

  @Column('boolean', {
    name: 'is_active',
    comment: '状态，用于标记删除',
    default: true,
  })
  @ExcludeToJson()
  isActive: boolean

  // --------------------------------------------------------------------------------------------------------------------

  /**
   * 软删除
   * @returns {Promise<void>}
   * @memberof MyEntity
   */
  async softRemove(): Promise<this> {
    this.isActive = false
    return this.save()
  }

  @BeforeRemove()
  protected beforeRemove() {
    throw new Error(
      `Attempted to hard-delete a soft-deletable ${this.constructor.name}, please use \`softRemove()\` API`,
    )
  }
}
