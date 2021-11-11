import express from 'express'
import { User } from '../models/User'

export const userRouter = express.Router()
userRouter.get('/list', async (req, res) => {
  const data = await User.find({
    order: { userName: 'ASC' },
    skip: +(req.query?.skip || 0),
    take: +(req.query?.take || 10),
  })
  data.forEach((d) => {
    // @ts-ignore
    delete d.password
  })
  res.json(data)
})
