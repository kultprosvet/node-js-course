import { Arg, Mutation, Resolver } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import fs from 'fs'
import { ImageInputGraphQL } from './types/ImageInputGraphQL'
import { Image } from '../../../../typeorm/models/Image'

@Resolver()
export class FileUploadResolver {
  @Mutation(() => Boolean)
  async upload(@Arg('file', () => GraphQLUpload) file: FileUpload) {
    file
      .createReadStream()
      .pipe(fs.createWriteStream('public/' + file.filename))

    return true
  }
  @Mutation(() => Boolean)
  async imageAdd(
    @Arg('data', () => ImageInputGraphQL) data: ImageInputGraphQL
  ) {
    const file = await data.file
    file
      .createReadStream()
      .pipe(fs.createWriteStream('public/' + file.filename))
    const image = new Image()
    image.laptop = { id: data.laptopId } as any
    image.url = 'public/' + file.filename
    await image.save()
    return true
  }
}
