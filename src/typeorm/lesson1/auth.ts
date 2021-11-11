import express from 'express'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Config } from '../../express/lesson1/config'
export const authRouter = express.Router()
//userRouter.use(authCheck)
authRouter.post('/register', async (req, res) => {
  try {
    const data = req.body
    let user = await User.findOne({ where: { userName: data.userName } })
    if (user) {
      const error = new Error(
        `User with given name(${data.userName}) already exists`
      ) as any
      error.code = 422
      throw error
    }
    user = new User()
    user.userName = data.userName
    user.password = bcrypt.hashSync(data.password, 10)
    await user.save()
    res.json(user)
  } catch (e: any) {
    res.status(e.code || 500)
    res.json({ error: e.message })
  }
})
authRouter.post('/login', async (req, res) => {
  try {
    const data = req.body
    const user = await User.findOneOrFail({
      where: { userName: data.userName },
    })
    if (bcrypt.compareSync(data.password, user.password)) {
      const out: any = Object.assign({}, user)
      delete out.password
      out.token = jwt.sign(out, Config.secretKey, { expiresIn: '30 days' })
      res.json(out)
    }
    throw new Error('wrong user name or password')
  } catch (e: any) {
    res.status(e.code || 500)
    res.json({ error: e.message })
  }
})
