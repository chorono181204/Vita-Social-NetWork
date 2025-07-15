import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Post } from '../../posts/models/post.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Comment extends BaseModel {
  @Field()
  content: string;

  @Field()
  authorId: string;

  @Field()
  postId: string;

  @Field(() => String, { nullable: true })
  parentId?: string | null;

  @Field(() => User, { nullable: true })
  author?: User | null;

  @Field(() => Post, { nullable: true })
  post?: Post | null;

  @Field(() => [Comment], { defaultValue: [] })
  replies: Comment[];

  @Field(() => Number, { defaultValue: 0 })
  likesCount: number;

  @Field(() => Number, { defaultValue: 0 })
  repliesCount: number;

  @Field(() => Boolean, { defaultValue: false })
  isLiked: boolean;
} 