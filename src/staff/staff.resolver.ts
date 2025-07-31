import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff, { name: 'createStaff' })
  create(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }
  @Query(() => [Staff], { name: 'findAllStaff' })
  findAll() {
    return this.staffService.findAll();
  }
  @Query(() => Staff, { name: 'findStaff' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const staff = await this.staffService.findOne(id);
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

  @Mutation(() => Staff, { name: 'updateStaff' })
  async update(
    @Args('updateStaffInput') updateStaffInput: UpdateStaffInput,
  ) {
    const staff = await this.staffService.update(updateStaffInput.id, updateStaffInput);
    if (!staff) {
      throw new NotFoundException(`Cannot update: Staff with ID ${updateStaffInput.id} not found`);
    }
    return staff;
  }

  @Mutation(() => Staff, { name: 'removeStaff' })
  async remove(@Args('id', { type: () => Int }) id: number) {
    const staff = await this.staffService.remove(id);
    if (!staff) {
      throw new NotFoundException(`Cannot delete: Staff with ID ${id} not found`);
    }
    return staff;
  }
}
