import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentInput } from './dto/create-department.input';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  create(createDepartmentInput: CreateDepartmentInput) {
    return this.prisma.department.create({
      data: {
        departmentName: createDepartmentInput.departmentName,
      },
    });
  }

  findAll() {
    return this.prisma.department.findMany();
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}
