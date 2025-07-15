import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsEnum, IsNumber, Min, Max } from 'class-validator';

export enum SearchType {
  ALL = 'ALL',
  POSTS = 'POSTS',
  RECIPES = 'RECIPES',
  USERS = 'USERS',
  ARTICLES = 'ARTICLES',
  COMMENTS = 'COMMENTS',
}

export enum SortOrder {
  RELEVANCE = 'RELEVANCE',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  POPULAR = 'POPULAR',
  RATING = 'RATING',
}

@InputType()
export class SearchQueryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  query: string;

  @Field(() => SearchType, { defaultValue: SearchType.ALL })
  @IsEnum(SearchType)
  type?: SearchType;

  @Field(() => SortOrder, { defaultValue: SortOrder.RELEVANCE })
  @IsEnum(SortOrder)
  sortBy?: SortOrder;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  categories?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  authors?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateTo?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cuisine?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  minRating?: number;
} 