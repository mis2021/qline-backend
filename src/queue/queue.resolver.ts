import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QueueService } from './queue.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Queue } from 'src/queue/entities/queue.model';

@Resolver(() => Queue)
export class QueueResolver {
  constructor(
    private readonly queueService: QueueService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Queue])
  async queuesByDepartment(
    @Args('departmentId', { type: () => Int }) departmentId: number,
  ) {
    return this.prisma.queue.findMany({
      where: { departmentId },
      orderBy: { createdAt: 'asc' },
    });
  }

  @Mutation(() => String)
  async createQueue(
    @Args('departmentId', { type: () => Int }) departmentId: number,
  ): Promise<string> {
    const department = await this.prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      throw new Error('Department does not exist');
    }

    if (department.departmentName.toUpperCase() === 'ADMIN') {
      throw new Error('ADMIN is not allowed to create a queue');
    }

    const count = await this.prisma.queue.count({
      where: { departmentId },
    });

    const queue = await this.prisma.queue.create({
      data: {
        departmentId,
        number: count + 1,
        status: 'WAITING',
      },
      include: { Department: true },
    });

    this.queueService.emitQueue({
      number: queue.number,
      department: queue.Department.departmentName,
      status: queue.status,
    });

    return `Queue number ${queue.number} created for ${queue.Department.departmentName}`;
  }
}
