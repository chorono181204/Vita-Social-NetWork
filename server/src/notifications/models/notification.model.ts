import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Notification extends BaseModel {
  @Field()
  userId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  message?: string;

  @Field()
  type: string;

  @Field()
  isRead: boolean;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  actionUrl?: string;

  @Field({ nullable: true })
  actionData?: string;

  @Field({ nullable: true })
  senderId?: string;

  @Field({ nullable: true })
  senderName?: string;

  @Field({ nullable: true })
  senderAvatar?: string;

  @Field({ nullable: true })
  targetId?: string;

  @Field({ nullable: true })
  targetType?: string;

  @Field(() => [String], { defaultValue: [] })
  tags: string[];

  @Field({ nullable: true })
  priority?: string;

  @Field({ nullable: true })
  scheduledAt?: Date;

  @Field({ nullable: true })
  sentAt?: Date;
}

@ObjectType()
export class NotificationPreferences {
  @Field()
  userId: string;

  @Field()
  emailNotifications: boolean;

  @Field()
  pushNotifications: boolean;

  @Field()
  inAppNotifications: boolean;

  @Field(() => [String])
  enabledTypes: string[];

  @Field(() => [String])
  disabledTypes: string[];

  @Field()
  quietHoursEnabled: boolean;

  @Field({ nullable: true })
  quietHoursStart?: string;

  @Field({ nullable: true })
  quietHoursEnd?: string;
}

@ObjectType()
export class NotificationStats {
  @Field()
  totalCount: number;

  @Field()
  unreadCount: number;

  @Field()
  readCount: number;

  @Field(() => [String])
  types: string[];
} 