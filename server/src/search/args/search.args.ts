import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { SearchType } from '../inputs/search-query.input';

@ArgsType()
export class SearchArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  query: string;

  @Field(() => SearchType, { nullable: true })
  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType;
}

@ArgsType()
export class SuggestionArgs {
  @Field()
  @IsNotEmpty()
  @IsString()
  query: string;

  @Field(() => SearchType, { nullable: true })
  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType;
} 