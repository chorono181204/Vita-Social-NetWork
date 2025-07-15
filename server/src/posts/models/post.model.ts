import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Post extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  content?: string | null;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => String, { nullable: true })
  category?: string | null;

  @Field(() => String, { nullable: true })
  cuisine?: string | null;

  @Field(() => String, { nullable: true })
  difficulty?: string | null;

  @Field(() => [String])
  tags: string[];

  @Field(() => String, { nullable: true })
  searchText?: string | null;

  @Field(() => String)
  authorId: string;

  @Field(() => User, { nullable: true })
  author?: User | null;

  @Field(() => Number, { defaultValue: 0 })
  likesCount: number;

  @Field(() => Number, { defaultValue: 0 })
  commentsCount: number;

  @Field(() => Number, { defaultValue: 0 })
  savesCount: number;
}
