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
  updateQueue(updateQueueInput: UpdateQueueInput) {
  const { id, ...data } = updateQueueInput;

  return this.prisma.queue.update({
    where: { id },
    data,
  });
  }
}
