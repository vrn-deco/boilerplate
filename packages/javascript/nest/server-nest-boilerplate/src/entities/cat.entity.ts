/*
 * @Author: Cphayim
 * @Date: 2019-07-10 09:47:48
 * @LastEditTime: 2019-08-16 16:15:01
 * @Description:
 */
import { Entity, Column, OneToOne, ManyToOne } from 'typeorm'
import { CatMetadata } from './cat-metadata.entity'
import { Master } from './master.entity'

@Entity()
export class Cat {
  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column({ length: 10 })
  name: string

  @Column('int')
  age: number

  @Column()
  breed: string

  @OneToOne(type => CatMetadata, catMetadata => catMetadata.cat, {
    cascade: true,
  })
  metadata: CatMetadata

  @ManyToOne(type => Master, master => master.cats)
  master: Master
}
