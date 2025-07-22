import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { Gender, CookingLevel } from '@prisma/client';
import '../../common/enums/graphql-enums';
@ObjectType()
export class UserProfile extends BaseModel {
  @Field()
  userId: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  website?: string;

  @Field(() => [String])
  dietaryPreferences: string[];

  @Field(() => [String])
  cuisinePreferences: string[];

  @Field(() => CookingLevel, { nullable: true })
  cookingLevel?: CookingLevel;

  @Field(() => [String])
  healthGoals: string[];

  @Field(() => [String])
  allergies: string[];

  @Field()
  followersCount: number;

  @Field()
  followingCount: number;

  @Field()
  postsCount: number;


} 