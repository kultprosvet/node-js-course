import { Field, ObjectType } from 'type-graphql'
import { UserGraphQL } from './UserGraphQL'

@ObjectType()
export class UserRegister {
  @Field()
  token: string
  @Field(() => UserGraphQL)
  user: UserGraphQL
}
