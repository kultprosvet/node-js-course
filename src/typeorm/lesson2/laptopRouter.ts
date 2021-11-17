import express from 'express'
import { Laptop } from '../models/Laptop'
import { Between, createQueryBuilder, In, MoreThan, Raw } from 'typeorm'
import { Brand } from '../models/Brand'

export const laptopRouter = express.Router()
laptopRouter.get('/', async (req, res) => {
  const data = await Laptop.find({
    // relations: ['brand', 'screenSize', 'screenResolution', 'images'],
    select: ['id', 'model'],
    where: { brand: { id: In([1, 2]) } },
  })
  res.json(data)
})
laptopRouter.get('/group', async (req, res) => {
  const data = await createQueryBuilder(Laptop, 'laptop')
    .leftJoin('laptop.brand', 'brand')
    .select('Min(price)', 'min')
    .addSelect('Count(laptop.id)', 'count')
    .addSelect('Max(price)', 'max')
    .addSelect('Min(brandId)', 'brandId')
    .addSelect('AVG(price)', 'avg')
    .addSelect('Min(brand.name)', 'name')
    .groupBy('laptop.brandId')
    .getRawMany()
  res.json(data)
})
laptopRouter.get('/detailsRaw', async (req, res) => {
  const data = await createQueryBuilder(Laptop, 'laptop')
    .leftJoinAndSelect('laptop.images', 'img')
    .limit(2)
    .offset(2)
    .getRawMany()

  res.json(data)
})
laptopRouter.get('/details', async (req, res) => {
  const data = await createQueryBuilder(Laptop, 'laptop')
    .leftJoinAndSelect('laptop.images', 'img')
    .take(2)
    .skip(1)
    .getMany()

  res.json(data)
})
laptopRouter.get('/sub', async (req, res) => {
  const data = await createQueryBuilder(Laptop, 'laptop')
    .select('id')
    .addSelect((subQuery) => {
      return subQuery
        .from(Brand, 'brand')
        .select('name')
        .where('brand.id=laptop.brandId')
    }, 'brandName')
    .where(`id=:id`, { id: 1 })
    .getRawMany()

  res.json(data)
})
