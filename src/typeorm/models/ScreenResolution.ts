import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Laptop } from './Laptop'
@Entity('screen_resolutions')
export class ScreenResolution extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 30 })
  name: string
  @OneToMany(() => Laptop, (laptop) => laptop.screenResolution)
  laptops: Laptop[]
}
