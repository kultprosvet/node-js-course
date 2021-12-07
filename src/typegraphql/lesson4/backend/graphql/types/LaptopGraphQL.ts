import { Field, Float, ID, InputType, Int, ObjectType } from 'type-graphql'
import { BrandGraphQL } from './BrandGraphQL'
import { ImageGraphQL } from '../ImageGraphQL'
import { IsNotEmpty } from 'class-validator'
@ObjectType()
export class LaptopGraphQL {
  @Field(() => ID, { nullable: true })
  id: number
  @Field(() => String)
  model: string
  @Field(() => String, { nullable: true })
  description: string
  @Field(() => Float)
  price: number
  @Field(() => BrandGraphQL, { nullable: true })
  brand: BrandGraphQL
  @Field(() => [ImageGraphQL], { nullable: true })
  images: ImageGraphQL[]
}
@InputType()
export class LaptopInputGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => String, { nullable: true })
  model: string
  @Field(() => Float, { nullable: true })
  price: number
  @Field(() => String, { nullable: true })
  description: string
}
