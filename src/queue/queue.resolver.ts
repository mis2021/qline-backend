import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QueueService } from './queue.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQueueInput } from './dto/create-queue.input';
import { Queue } from './entities/queue.model';

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
    @Args('createQueueInput') input: CreateQueueInput,
  ): Promise<string> {
    const {departmentId, type, priority, status = 'WAITING' } = input;


      if (departmentId === 1) {
    throw new Error('Queuing under departmentId 1 is not allowed.');
  }
    const count = await this.prisma.queue.count({
      where: {departmentId },
    });

    const queue = await this.prisma.queue.create({
      data: {
       
        departmentId,
        number: count + 1,
        type,
        priority,
        status,
      },
      include: {
        department: true,
      },
    });

    const prefix = queue.department.departmentName.slice(0, 4).toUpperCase();
    const formattedQueue = `${prefix}-${queue.number}`;

    return formattedQueue;
  }
}
