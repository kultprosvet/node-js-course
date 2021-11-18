import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Laptop } from './Laptop'

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'datetime' })
  createdAt = new Date()
  @Column({ type: 'text' })
  description: string
  @ManyToMany(() => Laptop, (laptop) => laptop.promotions)
  @JoinTable({
    name: 'laptop_promotions',
    inverseJoinColumn: { name: 'laptopId', referencedColumnName: 'id' },
    joinColumn: { name: 'promotionId', referencedColumnName: 'id' },
  })
  laptops: Laptop[]
}
