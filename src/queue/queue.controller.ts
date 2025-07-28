import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Sse('events')
  sendEvents(): Observable<MessageEvent> {
    return this.queueService.queue$.pipe(map((data) => ({ data })));
  }
}
