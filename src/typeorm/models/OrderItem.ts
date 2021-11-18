import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Order } from './Order'
import { Laptop } from './Laptop'
@Entity('order_items')
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Order
  @ManyToOne(() => Laptop)
  @JoinColumn({ name: 'laptopId' })
  laptop: Laptop
}
