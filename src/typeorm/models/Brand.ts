import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 100 })
  name: string
}
