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
import multer from 'multer'
import fs from 'fs'
import { Config } from './config'

const upload = multer({ dest: './uploads/' })

export const laptopRouter = express.Router()
laptopRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data)
    const file = req.file
    const laptop = new Laptop()
    laptop.model = data.model
    laptop.price = data.price
    laptop.brand = data.brand
    laptop.images = [{ url: 'public/' + file?.originalname }]
    laptop.description = ''
    await laptop.save()

    if (file?.path) fs.copyFileSync(file?.path, 'public/' + file?.originalname)
    res.json({ message: 'ok' })
  } catch (e) {
    res.json(e)
  }
})
laptopRouter.get('/images', async (req, res) => {
  const data = await Laptop.find({ relations: ['images'], withDeleted: true })
  for (const laptop of data) {
    for (const image of laptop.images || []) {
      if (!image.url?.match(/^http/i))
        image.url = `${Config.APP_URL}/${image.url}`
    }
  }
  res.json(data)
})
laptopRouter.get('/specs', (req, res) => {
  res.setHeader('content-type', 'application/text')
  const fileName = `output.txt`
  res.setHeader('content-disposition', `attachment; filename="${fileName}"`)
  res.write('Hello world!')
  res.end()
})
laptopRouter.get('/image', (req, res) => {
  res.setHeader('content-type', 'image/jpeg')
  const fileName = `file.jpeg`
  res.setHeader('content-disposition', `attachment; filename="${fileName}"`)
  const content = fs.readFileSync('public/acer.jpg')
  res.write(content)
  res.end()
})
/*
laptopRouter.delete('/:id', async (req, res) => {
  try {
    await Laptop.softRemove([{ id: +req.params.id } as any])
    res.json({ deleted: true })
  } catch (e: any) {
    console.log(e)
    res.json(e.message)
  }
})

 */
laptopRouter.delete('/:id', async (req, res) => {
  await getConnection().transaction(async (tm) => {
    const rep = tm.getRepository(Laptop)
    await rep.findOne({
      where: { id: +req.params.id },
      lock: { mode: 'pessimistic_write_or_fail' },
    })
    await rep.softRemove({ id: +req.params.id } as any)
  })
  res.json({ message: 'deleted' })
})
