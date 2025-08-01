import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateQueueInput } from './dto/update-queue.input';
@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}
  private queueSubject = new Subject<any>();
  queue$ = this.queueSubject.asObservable();

  emitQueue(data: any) {
    this.queueSubject.next(data);
  }
  async updateQueue(updateQueueInput: UpdateQueueInput) {
  const { id, ...data } = updateQueueInput;

  const updatedQueue = await this.prisma.queue.update({
    where: { id },
    data,
  });
  this.emitQueue({
    type: 'QUEUE_UPDATED',
    queue: updatedQueue,
  });

  return updatedQueue;
}
  
}
