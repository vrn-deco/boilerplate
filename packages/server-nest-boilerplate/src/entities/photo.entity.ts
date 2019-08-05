import { Entity, Column } from 'typeorm'

@Entity()
export class Photo {
  @Column({ primary: true, generated: 'increment' })
  id: number

  @Column({ length: 100 })
  name: string

  @Column('text')
  description: string

  @Column()
  filename: string

  @Column('int')
  views: number

  @Column()
  isPublished: boolean
}
