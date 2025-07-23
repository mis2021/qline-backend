import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/role/entities/role.entity'; 
import { Department } from 'src/department/entities/department.entity'; 

@ObjectType()
export class Staff {
  @Field()
  id: number;

  @Field()
  staffUser: string;

  @Field()
  staffPass: string;

  @Field(() => Int)
  departmentId: number;

  @Field(() => Int)
  roleId: number;

  @Field(() => Role) 
  role: Role;

  @Field(() => Department)
  department: Department;

  @Field()
  createdAt: Date;
}

