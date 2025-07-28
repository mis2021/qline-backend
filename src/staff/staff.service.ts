import { Injectable } from '@nestjs/common';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(createStaffInput: CreateStaffInput) {
    const hashedPassword = await bcrypt.hash(createStaffInput.staffPass, 10);
    return this.prisma.staff.create({
      data: {
        staffUser: createStaffInput.staffUser,
        staffPass: hashedPassword, 
        department: {
          connect: { id: createStaffInput.departmentId },
        },
        role: {
          connect: { id: createStaffInput.roleId },
        },
      },
      include: {
        role: true,
        department: true,
      },
    });
  }
  async findAll() {
    return this.prisma.staff.findMany({
      include: {
        role: true,
        department: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.staff.findUnique({
      where: { id },
      include: {
        role: true,
        department: true,
      },
    });
  }
  update(id: number, updateStaffInput: UpdateStaffInput) {
    return `This action updates a #${id} staff`;
  }
  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
