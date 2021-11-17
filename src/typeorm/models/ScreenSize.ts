import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Laptop } from './Laptop'

@Entity('screen_sizes')
export class ScreenSize extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  name: string
  @OneToMany(() => Laptop, (laptop) => laptop.screenSize)
  laptops: Laptop[]
}
