import 'reflect-metadata';
import {
  ObjectType,
  Field,
  HideField,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Post } from '../../posts/models/post.model';
import { UserProfile } from './user-profile.model';
import { BaseModel } from '../../common/models/base.model';
import { Role } from '@prisma/client';
import '../../common/enums/graphql-enums';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  username: string;

  @Field(() => Role)
  role: Role;

  @Field()
  isVerified: boolean;

  @Field()
  isActive: boolean;

  @Field(() => UserProfile, { nullable: true })
  profile?: UserProfile;

  @Field(() => [Post], { nullable: true })
  posts?: [Post] | null;

  @HideField()
  password: string;

  @HideField()
  tokenVersion: number;
}
