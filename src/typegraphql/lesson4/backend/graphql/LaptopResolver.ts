import {
  Arg,
  Authorized,
  FieldResolver,
  Int,
  Mutation,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'
import { LaptopGraphQL, LaptopInputGraphQL } from './types/LaptopGraphQL'
import { Laptop } from '../../../../typeorm/models/Laptop'
import { Image } from '../../../../typeorm/models/Image'
import { BrandGraphQL } from './types/BrandGraphQL'
import { Brand } from '../../../../typeorm/models/Brand'
import DataLoader from 'dataloader'
import { In } from 'typeorm'
import { ImageGraphQL } from './ImageGraphQL'
import { Inject, Service } from 'typedi'

@Service()
@Resolver(LaptopGraphQL)
export class LaptopResolver {
  @Inject('pubSub')
  pubSub: PubSubEngine
  @Query(() => [LaptopGraphQL])
  async laptopList() {
    const data = await Laptop.find()
    return data
  }

  @Query(() => LaptopGraphQL)
  async laptop(@Arg('id', () => Int) id: number) {
    return await Laptop.findOneOrFail(id)
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
  @Mutation(() => LaptopGraphQL)
  async updateLaptop(
    @Arg('data', () => LaptopInputGraphQL) data: LaptopInputGraphQL
  ) {
    const { id, ...other } = data
    // const laptop = await Laptop.findOneOrFail(data.id)
    await Laptop.update({ id }, other)
    const laptop = await Laptop.findOneOrFail(id)
    await this.pubSub.publish('LAPTOPS_UPDATES', laptop)
    return laptop
    //this.pubSub.publish()
  }

  @Subscription(() => LaptopGraphQL, {
    topics: 'LAPTOPS_UPDATES',
  })
  laptopUpdates(@Root() laptop: Laptop): LaptopGraphQL {
    return laptop as any
  }
  @Subscription(() => LaptopGraphQL, {
    topics: 'LAPTOPS_UPDATES',
    filter: ({ payload, args, context }) => {
      return payload.id == args.id
    },
  })
  @Authorized()
  laptopUpdatesById(
    @Arg('id', () => Int) id: number,
    @Root() laptop: Laptop
  ): LaptopGraphQL {
    return laptop as any
  }
}
