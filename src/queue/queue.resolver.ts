import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { QueueService } from './queue.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class QueueResolver {
  constructor(
    private readonly queueService: QueueService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => String)
  async createQueue(@Args('departmentId') departmentId: number): Promise<string> {
    const count = await this.prisma.queue.count({
      where: { departmentId },
    });

    const queue = await this.prisma.queue.create({
      data: {
        departmentId,
        number: count + 1,
        status: 'WAITING',
      },
      include: { Department: true }
    });

    this.queueService.emitQueue({
      number: queue.number,
      department: queue.Department.departmentName,
      status: queue.status
    });

    return `Queue number ${queue.number} created for ${queue.Department.departmentName}`;
  }
}
