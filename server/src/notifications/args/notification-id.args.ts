import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class NotificationIdArgs {
  @Field()
  @IsNotEmpty()
  notificationId: string;
} 