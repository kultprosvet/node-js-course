import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ImageGraphQL {
  @Field()
  id: number
  @Field()
  url: string
}
