import { UserGraphQL } from './UserGraphQL'
import { Response, Request } from 'express'
export type AppContext = {
  user?: UserGraphQL
  session: {
    req: Request
    res: Response
  }
}
