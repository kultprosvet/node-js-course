import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm'
import { Brand } from './Brand'
import { ScreenSize } from './ScreenSize'
import { ScreenResolution } from './ScreenResolution'
import { Image } from './Image'
import { Promotion } from './Promotion'
@Entity('laptop')
export class Laptop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  @Index({ unique: true })
  model: string
  @Column({ type: 'decimal', width: 10, precision: 2, nullable: false })
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
  @RelationId('screenResolution')
  screenResolutionId: number

  @OneToMany(() => Image, (img) => img.laptop, { cascade: true })
  images: Partial<Image>[]

  @ManyToMany(() => Promotion, (promotion) => promotion.laptops)
  promotions: Promotion[]

  @Column({ type: 'int', default: 0 })
  quantity: number

  @DeleteDateColumn()
  deletedAt: Date
}
