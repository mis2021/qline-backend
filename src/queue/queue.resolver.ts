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

  const prefix = queue.Department.departmentName.slice(0, 4).toUpperCase();
  const formattedQueue = `${prefix}-${queue.number}`;

  this.queueService.emitQueue({
    number: formattedQueue,
    department: queue.Department.departmentName,
    status: queue.status,
  });

  return `Queue number ${formattedQueue} created for ${queue.Department.departmentName}`;
}
}