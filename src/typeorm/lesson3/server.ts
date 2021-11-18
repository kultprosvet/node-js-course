import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createConnection } from 'typeorm'
import { laptopRouter } from './laptopRouter'
import { userRouter } from './userRouter'

async function startServer() {
  const app = express()
  app.use(express.json())

  await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: 'all',
    database: 'dev',
    username: 'dev',
    password: 'dev',
    entities: ['src/typeorm/models/*.ts'],
    synchronize: false,
    migrations: ['src/typeorm/migrations/*.ts'],
  })
  console.log('db connected')
  app.use('/laptop', laptopRouter)
  // app.use('/user', userRouter)
  app.listen(3000, () => {
    console.log('Server started')
  })
}

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  next(err)
}
startServer().catch((e) => {
  console.error(e)
})
