import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { OrderItem } from './OrderItem'
@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'datetime' })
  createdAt = new Date()
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[]
}
