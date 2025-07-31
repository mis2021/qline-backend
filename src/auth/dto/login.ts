import { ObjectType, Field } from '@nestjs/graphql';
import { Staff } from 'src/staff/entities/staff.entity';

@ObjectType()
export class Login {
  @Field()
  access_token: string;

  @Field()
  role: string;

  @Field(() => Staff, { nullable: true }) 
  staff?: Staff;

  @Field()
  success: boolean;
}
