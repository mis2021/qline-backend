import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    console.log('Created Department', createDepartmentInput)
    return this.departmentService.create(createDepartmentInput);
  }
  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentService.findAll();
  }

@Query(() => Department, { name: 'department' })
async findOne(@Args('id', { type: () => Int }) id: number) {
  const department = await this.departmentService.findOne(id);
  
  if (!department) {
    throw new NotFoundException(`Department with ID ${id} not found`);
  }

  if (department.departmentName.toUpperCase() === 'ADMIN') {
    throw new ForbiddenException('Access to ADMIN department is not allowed');
  }

  return department;
}

    @Mutation(() => Department)
    updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput) {
      return this.departmentService.update(updateDepartmentInput.id, updateDepartmentInput);
    }

  @Mutation(() => Department)
  async removeDepartment(@Args('id', { type: () => Int }) id: number) {
    console.log("Department Deleted" ,id)
    return this.departmentService.remove(id);
  }
}
