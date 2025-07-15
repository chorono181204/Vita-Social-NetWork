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
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { Post } from '../posts/models/post.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CommentIdArgs } from './args/comment-id.args';
import { PostIdArgs } from './args/post-id.args';
import { Comment } from './models/comment.model';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';
import { CommentsService } from './comments.service';

const pubSub = new PubSub();

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Subscription(() => Comment)
  commentCreated() {
    return pubSub.asyncIterator('commentCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @UserEntity() user: User,
    @Args('data') data: CreateCommentInput,
  ) {
    const newComment = await this.commentsService.createComment(user.id, data);
    pubSub.publish('commentCreated', { commentCreated: newComment });
    return newComment;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async updateComment(
    @UserEntity() user: User,
    @Args('id') commentId: string,
    @Args('data') data: UpdateCommentInput,
  ) {
    return this.commentsService.updateComment(commentId, user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async deleteComment(
    @UserEntity() user: User,
    @Args('id') commentId: string,
  ) {
    return this.commentsService.deleteComment(commentId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async likeComment(
    @UserEntity() user: User,
    @Args('id') commentId: string,
  ) {
    return this.commentsService.likeComment(commentId, user.id);
  }

  @Query(() => [Comment])
  async postComments(@Args() args: PostIdArgs) {
    return this.commentsService.getPostComments(args.postId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Comment])
  async postCommentsWithLikes(
    @UserEntity() user: User,
    @Args() args: PostIdArgs,
  ) {
    return this.commentsService.getPostComments(args.postId, user.id);
  }

  @Query(() => Comment)
  async comment(@Args() args: CommentIdArgs) {
    return this.commentsService.getComment(args.commentId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Comment)
  async commentWithLikes(
    @UserEntity() user: User,
    @Args() args: CommentIdArgs,
  ) {
    return this.commentsService.getComment(args.commentId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Comment])
  async userComments(@UserEntity() user: User) {
    return this.commentsService.getUserComments(user.id);
  }

  @ResolveField('author', () => User)
  async author(@Parent() comment: Comment) {
    return comment.author;
  }

  @ResolveField('post', () => Post)
  async post(@Parent() comment: Comment) {
    return comment.post;
  }
} 