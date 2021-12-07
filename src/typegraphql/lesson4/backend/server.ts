import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createConnection } from 'typeorm'
import http from 'http'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { graphqlUploadExpress } from 'graphql-upload'
import { Config } from '../../../express/lesson1/config'
import cookieParser from 'cookie-parser'
import {
  ConnectionContext,
  SubscriptionServer,
} from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import { Container } from 'typedi'
import cookie from 'cookie'

async function startServer() {
  const pubSub = new PubSub()
  Container.set('pubSub', pubSub)
  const app = express()
  app.use(cookieParser())
  app.use(graphqlUploadExpress({ maxFileSize: 50 * 1024 * 1024, maxFiles: 10 }))
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
    pubSub,
    resolvers: [`${__dirname}/graphql/**/*Resolver.${ext}`],
    dateScalarMode: 'isoDate',
    authChecker: (resolverData, roles) => {
      return !!resolverData.context.user
    },
    container: Container,
  })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(
        connectionParams: any,
        socket: WebSocket,
        ctx: ConnectionContext
      ) {
        const headers = ctx.request.headers
        const token = headers.authorization
        const out: Record<string, any> = {}
        const cookies: any = cookie.parse(headers.cookie || '')

        if (cookies?.token) {
          out.user = jwt.verify(cookies?.token, Config.secretKey)
        }
        // console.log('ws', ctx.request.headers)
        return out
      },
      onDisconnect: () => {
        console.log('disconnect')
      },
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // Pass a different path here if your ApolloServer serves at
      // a different path.
      path: '/graphql',
    }
  )

  const apolloServer = new ApolloServer({
    schema: schema,
    introspection: process.env.NODE_ENV != 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
    context: (session) => {
      const out: any = {}
      let token = session.req.header('Authorization')
      if (!token) {
        token = session.req.cookies.token
      }
      if (token) {
        out.user = jwt.verify(token, Config.secretKey)
      }
      out.session = session

      return out
    },
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      credentials: true,
      origin: function (origin: any, callback: any) {
        callback(null, true)
      },
    },
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
