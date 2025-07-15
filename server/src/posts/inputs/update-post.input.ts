import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cuisine?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
} 