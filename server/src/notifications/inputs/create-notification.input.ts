import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsEnum, IsBoolean, IsDateString } from 'class-validator';

export enum NotificationType {
  LIKE = 'LIKE',
  COMMENT = 'COMMENT',
  FOLLOW = 'FOLLOW',
  MENTION = 'MENTION',
  SYSTEM = 'SYSTEM',
  RECIPE_SHARE = 'RECIPE_SHARE',
  HEALTH_REMINDER = 'HEALTH_REMINDER',
  ACHIEVEMENT = 'ACHIEVEMENT',
  MESSAGE = 'MESSAGE',
  RECIPE_RATING = 'RECIPE_RATING',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  message?: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  actionUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  actionData?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderAvatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  targetId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  targetType?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field(() => NotificationPriority, { nullable: true })
  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

@InputType()
export class UpdateNotificationPreferencesInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  inAppNotifications?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  enabledTypes?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  disabledTypes?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  quietHoursEnabled?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quietHoursStart?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quietHoursEnd?: string;
} 