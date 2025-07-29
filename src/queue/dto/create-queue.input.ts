import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateQueueInput {
  @Field(() => Int)
  departmentId: number;

  @Field()
  type: string;

  @Field()
  priority: string;

  @Field({ nullable: true })
  status?: string;
}
