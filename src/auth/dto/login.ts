import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Login {
  @Field()
  access_token: string;

  @Field()
  role: string;

  @Field()
  success: boolean;
}
