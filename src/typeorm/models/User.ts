import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './Order'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0
  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  userName: string = ''
  @Column({ type: 'varchar', length: 100, select: false })
  password: string = ''
  @Column({ type: 'datetime' })
  createdAt: Date = new Date()
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]
}
