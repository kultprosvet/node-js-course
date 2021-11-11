import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field } from 'mysql2'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0
  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  userName: string = ''
  @Column({ type: 'varchar', length: 100 })
  password: string = ''
  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
}
