import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateStaffInput {
  @Field()
  staffUser: string;

  @Field()
  staffPass: string;

  @Field(() => Int)
  roleId: number;

  @Field(() => Int)
  departmentId: number;
}
