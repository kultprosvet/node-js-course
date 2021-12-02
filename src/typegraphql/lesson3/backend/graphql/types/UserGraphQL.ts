import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class UserGraphQL {
  @Field(() => Int)
  id: number
  @Field()
  userName: string
  @Field(() => Date)
  createdAt: Date
}
