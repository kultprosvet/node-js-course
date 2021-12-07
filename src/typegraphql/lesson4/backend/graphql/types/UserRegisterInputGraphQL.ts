import { Field, InputType } from 'type-graphql'
import { MinLength } from 'class-validator'
import { CustomValidation } from '../../validators/CustomValidator'

@InputType()
export class UserRegisterInputGraphQL {
  @Field()
  userName: string
  @Field(() => String)
  @MinLength(10)
  @CustomValidation(
    (value, args) => {
      return value.length > 10
    }, 
    { message: 'Password should be more then 10 chars',groups:['register'] }
  )
  password: string
}
