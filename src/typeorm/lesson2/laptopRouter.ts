import express from 'express'
import { Laptop } from '../models/Laptop'
import { Between, createQueryBuilder, In, MoreThan, Raw } from 'typeorm'
import { Brand } from '../models/Brand'

export const laptopRouter = express.Router()
laptopRouter.get('/', async (req, res) => {
  const data = await Laptop.find({ relations: ['promotions'] })
  res.json(data)
})
