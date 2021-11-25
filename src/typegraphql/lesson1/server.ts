import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createConnection } from 'typeorm'
import http from 'http'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { Config } from '../../express/lesson1/config'

async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)

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
  const ext = process.env.NODE_ENV === 'production' ? 'js' : 'ts'
  const schema = await buildSchema({
    resolvers: [`${__dirname}/graphql/**/*Resolver.${ext}`],
    dateScalarMode: 'isoDate',
    authChecker: (resolverData, roles) => {
      return !!resolverData.context.user
    },
  })

  const apolloServer = new ApolloServer({
    schema: schema,
    introspection: process.env.NODE_ENV != 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: (session) => {
      const out: any = {}
      const token = session.req.header('Authorization')
      if (token) {
        out.user = jwt.verify(token, Config.secretKey)
      }
      return out
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
  })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3000 }, () => {
      console.log('server started')
      resolve()
    })
  )
}

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  next(err)
}
startServer().catch((e) => {
  console.error(e)
})
