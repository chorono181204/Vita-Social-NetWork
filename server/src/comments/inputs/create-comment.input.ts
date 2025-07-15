import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @IsNotEmpty()
  postId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  parentId?: string;
} 