import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class QueueService {
  private queueSubject = new Subject<any>();
  queue$ = this.queueSubject.asObservable();

  emitQueue(data: any) {
    this.queueSubject.next(data);
  }
}
