import { Field, ID, ObjectType } from 'type-graphql'
@ObjectType()
export class BrandGraphQL {
  @Field(() => ID)
  id: number
  @Field(() => String)
  name: string
}
