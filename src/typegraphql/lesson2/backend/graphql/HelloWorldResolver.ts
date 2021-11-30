import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { nullable: true })
  async helloWorld() {
    return 'Hello World'
  }
  @Query(() => String)
  async sayHi(@Arg('msg', () => String, { nullable: true }) msg: string) {
    if (msg) return `>>>${msg}`
    return 'no msg'
  }
}
