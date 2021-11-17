import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm'
import { Brand } from './Brand'
import { ScreenSize } from './ScreenSize'
import { ScreenResolution } from './ScreenResolution'
import { Image } from './Image'
@Entity('laptop')
export class Laptop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  model: string
  @Column({ type: 'decimal', width: 10, precision: 2 })
  price: number

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand: Brand
  @RelationId('brand')
  brandId: number

  @Column({ type: 'text' })
  description: string

  @ManyToOne(() => ScreenSize, (screenSize) => screenSize.laptops)
  @JoinColumn({ name: 'screenSizeId' })
  screenSize: ScreenSize
  @RelationId('screenSize')
  screenSizeId: number

  @ManyToOne(
    () => ScreenResolution,
    (screenResolution) => screenResolution.laptops
  )
  @JoinColumn({ name: 'screenResolutionId' })
  screenResolution: ScreenResolution
  @RelationId('brand')
  screenResolutionId: number

  @OneToMany(() => Image, (img) => img.laptop)
  images: Image[]
}
