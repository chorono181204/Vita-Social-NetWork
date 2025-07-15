import {
  Resolver,
  Query,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { SearchArgs, SuggestionArgs } from './args/search.args';
import { SearchResponse, SearchSuggestion, SearchHistory } from './models/search-result.model';
import { SearchQueryInput, SearchType } from './inputs/search-query.input';
import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private searchService: SearchService) {}

  @Query(() => SearchResponse)
  async search(@Args() args: SearchArgs) {
    return this.searchService.search(args.query, undefined, { type: args.type });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SearchResponse)
  async searchWithUser(
    @UserEntity() user: User,
    @Args() args: SearchArgs,
  ) {
    return this.searchService.search(args.query, user.id, { type: args.type });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SearchResponse)
  async advancedSearch(
    @UserEntity() user: User,
    @Args('query') query: string,
    @Args('filters') filters: SearchQueryInput,
  ) {
    return this.searchService.search(query, user.id, filters);
  }

  @Query(() => [SearchSuggestion])
  async getSuggestions(@Args() args: SuggestionArgs) {
    return this.searchService.getSuggestions(args.query, args.type);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SearchHistory])
  async getSearchHistory(@UserEntity() user: User) {
    return this.searchService.getSearchHistory(user.id);
  }

  @Query(() => [SearchSuggestion])
  async getPopularSearches() {
    return this.searchService.getPopularSearches();
  }

  @Query(() => SearchResponse)
  async searchPosts(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.searchService.search(query, undefined, {
      type: SearchType.POSTS,
      limit,
      offset,
    });
  }

  @Query(() => SearchResponse)
  async searchRecipes(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
    @Args('difficulty', { nullable: true }) difficulty?: string,
    @Args('cuisine', { nullable: true }) cuisine?: string,
    @Args('minRating', { nullable: true }) minRating?: number,
  ) {
    return this.searchService.search(query, undefined, {
      type: SearchType.RECIPES,
      limit,
      offset,
      difficulty,
      cuisine,
      minRating,
    });
  }

  @Query(() => SearchResponse)
  async searchUsers(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.searchService.search(query, undefined, {
      type: SearchType.USERS,
      limit,
      offset,
    });
  }

  @Query(() => SearchResponse)
  async searchArticles(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.searchService.search(query, undefined, {
      type: SearchType.ARTICLES,
      limit,
      offset,
    });
  }

  @Query(() => SearchResponse)
  async searchComments(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ) {
    return this.searchService.search(query, undefined, {
      type: SearchType.COMMENTS,
      limit,
      offset,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async clearSearchHistory(@UserEntity() user: User) {
    await this.searchService.clearSearchHistory(user.id);
    return true;
  }
} 