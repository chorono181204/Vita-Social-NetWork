import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;
} 