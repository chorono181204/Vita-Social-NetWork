import { InputType, Field } from '@nestjs/graphql';
import { Gender, CookingLevel } from '@prisma/client';

@InputType()
export class UpdateUserInput {
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

  @Field(() => [String], { nullable: true })
  dietaryPreferences?: string[];

  @Field(() => [String], { nullable: true })
  cuisinePreferences?: string[];

  @Field(() => CookingLevel, { nullable: true })
  cookingLevel?: CookingLevel;

  @Field(() => [String], { nullable: true })
  healthGoals?: string[];

  @Field(() => [String], { nullable: true })
  allergies?: string[];
} 