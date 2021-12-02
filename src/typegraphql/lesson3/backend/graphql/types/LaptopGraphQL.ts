import { Field, Float, ID, Int, ObjectType } from 'type-graphql'
import { BrandGraphQL } from './BrandGraphQL'
import { ImageGraphQL } from '../ImageGraphQL'
@ObjectType()
export class LaptopGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => String)
  model: string
  @Field(() => Float)
  price: number
  @Field(() => BrandGraphQL, { nullable: true })
  brand: BrandGraphQL
  @Field(() => [ImageGraphQL], { nullable: true })
  images: ImageGraphQL[]
}
