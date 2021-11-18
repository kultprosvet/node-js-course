import express from 'express'
import { User } from '../models/User'

export const userRouter = express.Router()
userRouter.get('/', async (req, res) => {
  const data = await User.find()
  res.json(data)
})
