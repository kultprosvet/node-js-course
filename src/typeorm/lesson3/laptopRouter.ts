import express from 'express'
import { Laptop } from '../models/Laptop'
import {
  Between,
  createQueryBuilder,
  getConnection,
  In,
  MoreThan,
  Raw,
} from 'typeorm'
import { Brand } from '../models/Brand'

export const laptopRouter = express.Router()
laptopRouter.get('/', async (req, res) => {
  const data = await Laptop.find({ relations: ['promotions'] })
  res.json(data)
})
laptopRouter.post('/', async (req, res) => {
  try {
    const laptop = new Laptop()
    for (const fld in req.body) {
      // @ts-ignore
      laptop[fld] = req.body[fld]
    }
    await laptop.save()
    res.json(laptop)
  } catch (e: any) {
    console.log(e)
    res.json(e.message)
  }
})
laptopRouter.put('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findOneOrFail(req.params.id)
    for (const fld in req.body) {
      if (fld == 'id') continue
      // @ts-ignore
      laptop[fld] = req.body[fld]
    }
    await laptop.save()
    res.json(laptop)
  } catch (e: any) {
    console.log(e)
    res.json(e.message)
  }
})
laptopRouter.delete('/:id', async (req, res) => {
  try {
    await Laptop.remove([{ id: +req.params.id } as any])

    res.json({ deleted: true })
  } catch (e: any) {
    console.log(e)
    res.json(e.message)
  }
})
laptopRouter.post('/reserve/:id', async (req, res) => {
  try {
    let success = false
    let tries = 0
    do {
      try {
        await getConnection().transaction(async (tm) => {
          const laptop = await tm
            .createQueryBuilder(Laptop, 'laptop')
            .select('id')
            .addSelect('quantity')
            .where('id=:id', { id: req.params.id })
            .setLock('pessimistic_write_or_fail')
            .getRawOne()
          if (laptop.quantity == 0) {
            throw new Error('no stock')
          }
          await tm
            .createQueryBuilder(Laptop, 'laptop')
            .update(Laptop)
            .set({ quantity: () => 'quantity-1' })
            .where('id=:id', { id: req.params.id })
            .execute()
        })
        success = true
      } catch (e) {
        tries++
      }
      const laptop = await Laptop.findOne(req.params.id)
      if (laptop?.quantity == 0) {
        tries = 10
      }
    } while (!success && tries < 10)
    res.json({ reserved: true })
  } catch (e: any) {
    console.log(e)
    res.json(e.message)
  }
})
