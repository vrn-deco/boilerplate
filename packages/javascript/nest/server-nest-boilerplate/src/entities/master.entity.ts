/*
 * @Author: Cphayim
 * @Date: 2019-07-10 09:47:48
 * @LastEditTime: 2019-07-10 16:41:26
 * @Description:
 */
import { Entity, Column, OneToOne, OneToMany } from 'typeorm'
import { Cat } from './cat.entity'

@Entity()
export class Master {
  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column({ length: 10 })
  name: string

  @Column('tinyint')
  grand: number

  @OneToMany(type => Cat, cat => cat.master, {
    cascade: true,
  })
  cats: Cat[]
}
