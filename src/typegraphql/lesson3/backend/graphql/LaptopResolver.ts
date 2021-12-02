import { FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { LaptopGraphQL } from './types/LaptopGraphQL'
import { Laptop } from '../../../../typeorm/models/Laptop'
import { Image } from '../../../../typeorm/models/Image'
import { BrandGraphQL } from './types/BrandGraphQL'
import { Brand } from '../../../../typeorm/models/Brand'
import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { ImageGraphQL } from './ImageGraphQL'

@Resolver(LaptopGraphQL)
export class LaptopResolver {
  @Query(() => [LaptopGraphQL])
  async laptopList() {
    const data = await Laptop.find()
    return data
  }
  brandDataLoader = new DataLoader(async (ids: readonly number[]) => {
    const out = []
    const brands = await Brand.find({
      where: { id: In(ids as number[]) },
    })
    for (const id of ids) {
      out.push(brands.find((b) => b.id == id))
    }
    return out
  })
  @FieldResolver(() => BrandGraphQL)
  async brand(@Root() laptop: Laptop) {
    if (laptop.brandId) return this.brandDataLoader.load(laptop.brandId)
    else return null
  }
  imageDataLoader = new DataLoader(async (ids: readonly number[]) => {
    const out: Image[][] = []
    const images = await Image.find({
      where: { laptop: { id: In(ids as number[]) } },
    })
    const map: Record<number, Image[]> = {}
    for (const image of images) {
      if (!map[image.laptopId]) {
        map[image.laptopId] = []
      }
      map[image.laptopId].push(image)
    }
    for (const id of ids) {
      out.push(map[id] || [])
    }
    return out
  })
  @FieldResolver(() => [ImageGraphQL])
  async images(@Root() laptop: Laptop) {
    return await this.imageDataLoader.load(laptop.id)
  }
}
