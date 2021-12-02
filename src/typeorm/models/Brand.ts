import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  name: string
}
