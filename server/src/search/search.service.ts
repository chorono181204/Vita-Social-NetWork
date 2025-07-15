import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SearchQueryInput, SearchType, SortOrder } from './inputs/search-query.input';
import { SearchResult, SearchResponse, SearchSuggestion, SearchHistory } from './models/search-result.model';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, userId?: string, filters?: SearchQueryInput): Promise<SearchResponse> {
    const searchQuery = query.toLowerCase().trim();
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;
    const type = filters?.type || SearchType.ALL;

    const results: SearchResult[] = [];
    let totalCount = 0;

    if (type === SearchType.ALL || type === SearchType.POSTS) {
      const posts = await this.searchPosts(searchQuery, limit, offset, filters);
      results.push(...posts);
      totalCount += posts.length;
    }

    if (type === SearchType.ALL || type === SearchType.RECIPES) {
      const recipes = await this.searchRecipes(searchQuery, limit, offset, filters);
      results.push(...recipes);
      totalCount += recipes.length;
    }

    if (type === SearchType.ALL || type === SearchType.USERS) {
      const users = await this.searchUsers(searchQuery, limit, offset, filters);
      results.push(...users);
      totalCount += users.length;
    }

    if (type === SearchType.ALL || type === SearchType.ARTICLES) {
      const articles = await this.searchArticles(searchQuery, limit, offset, filters);
      results.push(...articles);
      totalCount += articles.length;
    }

    if (type === SearchType.ALL || type === SearchType.COMMENTS) {
      const comments = await this.searchComments(searchQuery, limit, offset, filters);
      results.push(...comments);
      totalCount += comments.length;
    }

    const sortedResults = this.sortResults(results, filters?.sortBy || SortOrder.RELEVANCE);
    const suggestions = await this.generateSuggestions(searchQuery, type);
    const availableFilters = await this.getAvailableFilters(searchQuery, type);

    if (userId) {
      await this.saveSearchHistory(userId, query, totalCount);
    }

    return {
      results: sortedResults.slice(0, limit),
      totalCount,
      hasMore: totalCount > limit + offset,
      suggestions,
      filters: availableFilters,
    };
  }

  private async searchPosts(query: string, limit: number, offset: number, filters?: SearchQueryInput): Promise<SearchResult[]> {
    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { searchText: { contains: query, mode: 'insensitive' } },
      ],
      published: true,
    };

    if (filters?.categories?.length) {
      where.category = { in: filters.categories };
    }

    if (filters?.tags?.length) {
      where.tags = { hasSome: filters.tags };
    }

    if (filters?.authors?.length) {
      where.authorId = { in: filters.authors };
    }

    if (filters?.dateFrom || filters?.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
      if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
    }

    const posts = await this.prisma.post.findMany({
      where,
      include: { author: true },
      take: limit,
      skip: offset,
      orderBy: this.getOrderBy(filters?.sortBy),
    });

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      type: 'POST',
      score: this.calculateRelevanceScore(post.title, post.content, query),
      image: post.image,
      author: post.author?.name,
      category: post.category,
      tags: post.tags,
      metadata: JSON.stringify({
        likesCount: post.likesCount,
        commentsCount: post.commentsCount,
        savesCount: post.savesCount,
      }),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  private async searchRecipes(query: string, limit: number, offset: number, filters?: SearchQueryInput): Promise<SearchResult[]> {
    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { ingredients: { contains: query, mode: 'insensitive' } },
        { instructions: { contains: query, mode: 'insensitive' } },
      ],
      published: true,
    };

    if (filters?.difficulty) {
      where.difficulty = filters.difficulty;
    }

    if (filters?.cuisine) {
      where.cuisine = filters.cuisine;
    }

    if (filters?.minRating) {
      where.rating = { gte: filters.minRating };
    }

    const recipes = await this.prisma.recipe.findMany({
      where,
      include: { author: true },
      take: limit,
      skip: offset,
      orderBy: this.getOrderBy(filters?.sortBy),
    });

    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      content: recipe.description,
      type: 'RECIPE',
      score: this.calculateRelevanceScore(recipe.title, recipe.description, query),
      image: recipe.image,
      author: recipe.author?.name,
      category: recipe.category,
      tags: recipe.tags,
      metadata: JSON.stringify({
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        rating: recipe.rating,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
      }),
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }));
  }

  private async searchUsers(query: string, limit: number, offset: number, filters?: SearchQueryInput): Promise<SearchResult[]> {
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } },
      ],
    };

    const users = await this.prisma.user.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    return users.map(user => ({
      id: user.id,
      title: user.name,
      content: user.bio,
      type: 'USER',
      score: this.calculateRelevanceScore(user.name, user.bio, query),
      image: user.avatar,
      author: user.name,
      category: 'User',
      tags: user.dietaryPreferences,
      metadata: JSON.stringify({
        email: user.email,
        location: user.location,
        website: user.website,
      }),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  private async searchArticles(query: string, limit: number, offset: number, filters?: SearchQueryInput): Promise<SearchResult[]> {
    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
        { summary: { contains: query, mode: 'insensitive' } },
      ],
      published: true,
    };

    const articles = await this.prisma.article.findMany({
      where,
      include: { author: true },
      take: limit,
      skip: offset,
      orderBy: this.getOrderBy(filters?.sortBy),
    });

    return articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.summary,
      type: 'ARTICLE',
      score: this.calculateRelevanceScore(article.title, article.content, query),
      image: article.image,
      author: article.author?.name,
      category: article.category,
      tags: article.tags,
      metadata: JSON.stringify({
        readTime: article.readTime,
        views: article.views,
        rating: article.rating,
      }),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));
  }

  private async searchComments(query: string, limit: number, offset: number, filters?: SearchQueryInput): Promise<SearchResult[]> {
    const where: any = {
      content: { contains: query, mode: 'insensitive' },
    };

    const comments = await this.prisma.comment.findMany({
      where,
      include: { author: true, post: true },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    return comments.map(comment => ({
      id: comment.id,
      title: `Comment on ${comment.post?.title || 'Post'}`,
      content: comment.content,
      type: 'COMMENT',
      score: this.calculateRelevanceScore('', comment.content, query),
      author: comment.author?.name,
      category: 'Comment',
      metadata: JSON.stringify({
        postId: comment.postId,
        likesCount: comment.likesCount,
        repliesCount: comment.repliesCount,
      }),
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));
  }

  private calculateRelevanceScore(title: string, content: string, query: string): number {
    const titleWeight = 3;
    const contentWeight = 1;
    
    const titleScore = this.getTextSimilarity(title.toLowerCase(), query);
    const contentScore = this.getTextSimilarity(content.toLowerCase(), query);
    
    return (titleScore * titleWeight + contentScore * contentWeight) / (titleWeight + contentWeight);
  }

  private getTextSimilarity(text: string, query: string): number {
    const words = query.split(' ').filter(word => word.length > 0);
    let score = 0;
    
    words.forEach(word => {
      if (text.includes(word)) {
        score += 1;
      }
    });
    
    return score / words.length;
  }

  private getOrderBy(sortBy?: SortOrder): any {
    switch (sortBy) {
      case SortOrder.NEWEST:
        return { createdAt: 'desc' };
      case SortOrder.OLDEST:
        return { createdAt: 'asc' };
      case SortOrder.POPULAR:
        return { likesCount: 'desc' };
      case SortOrder.RELEVANCE:
      default:
        return { createdAt: 'desc' };
    }
  }

  async getSuggestions(query: string, type?: SearchType): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];
    const searchQuery = query.toLowerCase().trim();

    if (!type || type === SearchType.POSTS) {
      const postSuggestions = await this.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { content: { contains: searchQuery, mode: 'insensitive' } },
          ],
          published: true,
        },
        select: { title: true },
        take: 5,
      });

      suggestions.push(...postSuggestions.map(post => ({
        text: post.title,
        type: 'POST',
        count: 1,
      })));
    }

    if (!type || type === SearchType.RECIPES) {
      const recipeSuggestions = await this.prisma.recipe.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
          ],
          published: true,
        },
        select: { title: true },
        take: 5,
      });

      suggestions.push(...recipeSuggestions.map(recipe => ({
        text: recipe.title,
        type: 'RECIPE',
        count: 1,
      })));
    }

    return suggestions.slice(0, 10);
  }

  async getSearchHistory(userId: string): Promise<SearchHistory[]> {
    return this.prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: 20,
    });
  }

  async saveSearchHistory(userId: string, query: string, resultCount: number): Promise<void> {
    await this.prisma.searchHistory.create({
      data: {
        userId,
        query,
        resultCount,
        timestamp: new Date(),
      },
    });
  }

  async getPopularSearches(): Promise<SearchSuggestion[]> {
    const popularSearches = await this.prisma.searchHistory.groupBy({
      by: ['query'],
      _count: { query: true },
      orderBy: { _count: { query: 'desc' } },
      take: 10,
    });

    return popularSearches.map(search => ({
      text: search.query,
      type: 'POPULAR',
      count: search._count.query,
    }));
  }

  private async generateSuggestions(query: string, type: SearchType): Promise<string[]> {
    const suggestions = await this.getSuggestions(query, type);
    return suggestions.map(s => s.text).slice(0, 5);
  }

  private async getAvailableFilters(query: string, type: SearchType): Promise<string[]> {
    const filters: string[] = [];

    if (type === SearchType.POSTS || type === SearchType.ALL) {
      const categories = await this.prisma.post.groupBy({
        by: ['category'],
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
          published: true,
        },
      });
      filters.push(...categories.map(c => c.category).filter(Boolean));
    }

    if (type === SearchType.RECIPES || type === SearchType.ALL) {
      const cuisines = await this.prisma.recipe.groupBy({
        by: ['cuisine'],
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          published: true,
        },
      });
      filters.push(...cuisines.map(c => c.cuisine).filter(Boolean));
    }

    return [...new Set(filters)];
  }
} 