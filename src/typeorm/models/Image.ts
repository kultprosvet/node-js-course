import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Laptop } from './Laptop'
@Entity('images')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 255 })
  url: string
  @ManyToOne(() => Laptop, (laptop) => laptop.images)
  @JoinColumn({ name: 'laptopId' })
  laptop: Laptop
}
