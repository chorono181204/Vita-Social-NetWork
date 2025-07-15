import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { TargetType } from '../inputs/create-interaction.input';

@ArgsType()
export class TargetIdArgs {
  @Field()
  @IsNotEmpty()
  targetId: string;

  @Field(() => TargetType)
  @IsEnum(TargetType)
  targetType: TargetType;
} 