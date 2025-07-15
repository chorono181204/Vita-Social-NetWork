import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {} 