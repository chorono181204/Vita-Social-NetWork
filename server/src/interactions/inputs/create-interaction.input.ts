import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export enum InteractionType {
  LIKE = 'LIKE',
  SHARE = 'SHARE',
  SAVE = 'SAVE',
}

export enum TargetType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  RECIPE = 'RECIPE',
  ARTICLE = 'ARTICLE',
}

@InputType()
export class CreateInteractionInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  targetId: string;

  @Field(() => TargetType)
  @IsEnum(TargetType)
  targetType: TargetType;

  @Field(() => InteractionType)
  @IsEnum(InteractionType)
  interactionType: InteractionType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  metadata?: string;
} 