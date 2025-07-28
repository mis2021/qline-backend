import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueResolver } from './queue.resolver';

@Module({
  providers: [QueueService, QueueResolver],
  controllers: [QueueController]
})
export class QueueModule {}
