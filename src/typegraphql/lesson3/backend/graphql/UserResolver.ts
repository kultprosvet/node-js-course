import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../../../../typeorm/models/User'
import bcrypt from 'bcrypt'
import { UserRegisterInputGraphQL } from './types/UserRegisterInputGraphQL'
import { UserRegister } from './types/UserRegister'
import { Config } from '../../../../express/lesson1/config'
import jwt from 'jsonwebtoken'
import { UserGraphQL } from './types/UserGraphQL'

@Resolver()
export class UserResolver {
  @Mutation(() => UserRegister)
  async userRegister(
    @Arg('data', () => UserRegisterInputGraphQL, {
      validate: { groups: ['register'] },
    })
    data: UserRegisterInputGraphQL
  ): Promise<UserRegister> {
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
    const out = new UserRegister()
    out.token = jwt.sign(
      { id: user.id, userName: user.userName },
      Config.secretKey,
      { expiresIn: '30 days' }
    )
    out.user = user
    return out
  }
  @Mutation(() => UserRegister)
  async userLogin(
    @Arg('data', () => UserRegisterInputGraphQL, { validate: false })
    data: UserRegisterInputGraphQL
  ): Promise<UserRegister> {
    const user = await User.findOneOrFail({
      where: { userName: data.userName },
    })
    if (bcrypt.compareSync(data.password, user.password)) {
      const out = new UserRegister()
      out.user = user
      out.token = jwt.sign(
        { id: user.id, userName: user.userName },
        Config.secretKey,
        { expiresIn: '30 days' }
      )
      return out
    }
    throw new Error('wrong user name or password')
  }
  @Query(() => UserGraphQL)
  @Authorized()
  async userMe(@Ctx() ctx: any) {
    return User.findOneOrFail(ctx.user.id)
  }
}
