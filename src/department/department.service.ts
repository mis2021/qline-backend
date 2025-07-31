import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

 create(createDepartmentInput: CreateDepartmentInput) {
  return this.prisma.department.create({
    data: {
      departmentName: createDepartmentInput.departmentName,
      prefix: createDepartmentInput.prefix, 
    },
  });
}

 async findAll() {
  return this.prisma.department.findMany({
    where: {
      NOT: {
        id: 1,
      },
    },
  });
}

  update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentInput,
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

 async remove(id: number) {
  const deletedDepartment = await this.prisma.department.delete({ where: { id } });
  console.log("Department Deleted", id);
  return deletedDepartment;
}
}
