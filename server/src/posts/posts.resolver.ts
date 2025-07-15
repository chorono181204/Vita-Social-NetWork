import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { PostIdArgs } from './args/post-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Post } from './models/post.model';
import { PostConnection } from './models/post-connection.model';
import { PostOrder } from './inputs/post-order.input';
import { CreatePostInput } from './inputs/create-post.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostsService } from './posts.service';

const pubSub = new PubSub();

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Subscription(() => Post)
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @UserEntity() user: User,
    @Args('data') data: CreatePostInput,
  ) {
    const newPost = await this.postsService.createPost(user.id, data);
    pubSub.publish('postCreated', { postCreated: newPost });
    return newPost;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @UserEntity() user: User,
    @Args('id') postId: string,
    @Args('data') data: UpdatePostInput,
  ) {
    return this.postsService.updatePost(postId, user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async deletePost(
    @UserEntity() user: User,
    @Args('id') postId: string,
  ) {
    return this.postsService.deletePost(postId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async likePost(
    @UserEntity() user: User,
    @Args('id') postId: string,
  ) {
    return this.postsService.likePost(postId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async savePost(
    @UserEntity() user: User,
    @Args('id') postId: string,
  ) {
    return this.postsService.savePost(postId, user.id);
  }

  @Query(() => PostConnection)
  async publishedPosts(
    @Args() paginationArgs: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder,
  ) {
    return this.postsService.getPublishedPosts(paginationArgs, query, orderBy);
  }

  @Query(() => [Post])
  async userPosts(@Args() args: UserIdArgs) {
    return this.postsService.getUserPosts(args.userId);
  }

  @Query(() => Post)
  async post(@Args() args: PostIdArgs) {
    return this.postsService.getPost(args.postId);
  }

  @ResolveField('author', () => User)
  async author(@Parent() post: Post) {
    return post.author;
  }
}
