/*
 * @Author: Cphayim
 * @Date: 2019-07-10 09:47:48
 * @LastEditTime: 2019-07-10 14:16:19
 * @Description:
 */
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Cat } from './cat.entity'

@Entity()
export class CatMetadata {
  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column('int')
  width: number

  @Column('int')
  height: number

  @OneToOne(type => Cat, cat => cat.metadata)
  @JoinColumn()
  cat: Cat
}
