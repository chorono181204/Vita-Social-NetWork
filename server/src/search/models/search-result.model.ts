import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class SearchResult extends BaseModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  type: string;

  @Field()
  score: number;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
export class SearchResponse {
  @Field(() => [SearchResult])
  results: SearchResult[];

  @Field()
  totalCount: number;

  @Field()
  hasMore: boolean;

  @Field(() => [String])
  suggestions: string[];

  @Field(() => [String])
  filters: string[];
}

@ObjectType()
export class SearchSuggestion {
  @Field()
  text: string;

  @Field()
  type: string;

  @Field()
  count: number;
}

@ObjectType()
export class SearchHistory {
  @Field()
  id: string;

  @Field()
  query: string;

  @Field()
  userId: string;

  @Field()
  timestamp: Date;

  @Field({ nullable: true })
  resultCount?: number;
} 