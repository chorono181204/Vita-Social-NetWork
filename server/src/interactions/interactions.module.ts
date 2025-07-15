import { Module } from '@nestjs/common';
import { InteractionsResolver } from './interactions.resolver';
import { InteractionsService } from './interactions.service';

@Module({
  providers: [InteractionsResolver, InteractionsService],
  exports: [InteractionsService],
})
export class InteractionsModule {} 