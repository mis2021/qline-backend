import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/entities/department.entity';

@ObjectType()
export class Queue {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  number: number;
  @Field(() => Department)
  Department: Department;
  @Field(() => Int)
  departmentId: number;
  @Field()
  status: string;
  @Field()
  createdAt: Date;
}
