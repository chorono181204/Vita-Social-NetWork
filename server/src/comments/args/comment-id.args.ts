import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class CommentIdArgs {
  @Field()
  @IsNotEmpty()
  commentId: string;
} 