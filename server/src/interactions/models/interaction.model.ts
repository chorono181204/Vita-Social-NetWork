import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Interaction extends BaseModel {
  @Field()
  userId: string;

  @Field()
  targetId: string;

  @Field()
  targetType: string;

  @Field()
  interactionType: string;

  @Field(() => String, { nullable: true })
  metadata?: string | null;
}

@ObjectType()
export class InteractionStats {
  @Field()
  targetId: string;

  @Field()
  targetType: string;

  @Field(() => Number, { defaultValue: 0 })
  likesCount: number;

  @Field(() => Number, { defaultValue: 0 })
  sharesCount: number;

  @Field(() => Number, { defaultValue: 0 })
  savesCount: number;

  @Field(() => Boolean, { defaultValue: false })
  isLiked: boolean;

  @Field(() => Boolean, { defaultValue: false })
  isShared: boolean;

  @Field(() => Boolean, { defaultValue: false })
  isSaved: boolean;
} 