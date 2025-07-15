import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

export enum PostOrderField {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  PUBLISHED = 'published',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

@InputType()
export class PostOrder {
  @Field(() => PostOrderField)
  @IsEnum(PostOrderField)
  field: PostOrderField;

  @Field(() => SortDirection)
  @IsEnum(SortDirection)
  direction: SortDirection;
} 