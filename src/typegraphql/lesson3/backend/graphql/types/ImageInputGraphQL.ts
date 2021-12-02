import { Field, InputType, Int } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@InputType()
export class ImageInputGraphQL {
  @Field(() => GraphQLUpload)
  file: FileUpload
  @Field(() => Int)
  laptopId: number
}
