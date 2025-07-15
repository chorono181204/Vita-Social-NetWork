import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { TargetIdArgs } from './args/target-id.args';
import { Interaction, InteractionStats } from './models/interaction.model';
import { CreateInteractionInput, InteractionType, TargetType } from './inputs/create-interaction.input';
import { InteractionsService } from './interactions.service';

const pubSub = new PubSub();

@Resolver(() => Interaction)
export class InteractionsResolver {
  constructor(private interactionsService: InteractionsService) {}

  @Subscription(() => Interaction)
  interactionCreated() {
    return pubSub.asyncIterator('interactionCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Interaction)
  async createInteraction(
    @UserEntity() user: User,
    @Args('data') data: CreateInteractionInput,
  ) {
    const interaction = await this.interactionsService.createInteraction(user.id, data);
    pubSub.publish('interactionCreated', { interactionCreated: interaction });
    return interaction;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Interaction)
  async likeContent(
    @UserEntity() user: User,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: TargetType,
  ) {
    return this.interactionsService.createInteraction(user.id, {
      targetId,
      targetType,
      interactionType: InteractionType.LIKE,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Interaction)
  async shareContent(
    @UserEntity() user: User,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: TargetType,
    @Args('metadata', { nullable: true }) metadata?: string,
  ) {
    return this.interactionsService.createInteraction(user.id, {
      targetId,
      targetType,
      interactionType: InteractionType.SHARE,
      metadata,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Interaction)
  async saveContent(
    @UserEntity() user: User,
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: TargetType,
  ) {
    return this.interactionsService.createInteraction(user.id, {
      targetId,
      targetType,
      interactionType: InteractionType.SAVE,
    });
  }

  @Query(() => InteractionStats)
  async interactionStats(@Args() args: TargetIdArgs) {
    return this.interactionsService.getInteractionStats(args.targetId, args.targetType);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => InteractionStats)
  async interactionStatsWithUser(
    @UserEntity() user: User,
    @Args() args: TargetIdArgs,
  ) {
    return this.interactionsService.getInteractionStats(args.targetId, args.targetType, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Interaction])
  async userInteractions(@UserEntity() user: User) {
    return this.interactionsService.getUserInteractions(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Interaction])
  async userLikes(@UserEntity() user: User) {
    return this.interactionsService.getUserLikes(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Interaction])
  async userShares(@UserEntity() user: User) {
    return this.interactionsService.getUserShares(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Interaction])
  async userSaves(@UserEntity() user: User) {
    return this.interactionsService.getUserSaves(user.id);
  }

  @Query(() => [Interaction])
  async topLikedContent(
    @Args('targetType') targetType: TargetType,
    @Args('limit', { defaultValue: 10 }) limit: number,
  ) {
    return this.interactionsService.getTopInteractedContent(targetType, InteractionType.LIKE, limit);
  }

  @Query(() => [Interaction])
  async topSharedContent(
    @Args('targetType') targetType: TargetType,
    @Args('limit', { defaultValue: 10 }) limit: number,
  ) {
    return this.interactionsService.getTopInteractedContent(targetType, InteractionType.SHARE, limit);
  }

  @Query(() => [Interaction])
  async topSavedContent(
    @Args('targetType') targetType: TargetType,
    @Args('limit', { defaultValue: 10 }) limit: number,
  ) {
    return this.interactionsService.getTopInteractedContent(targetType, InteractionType.SAVE, limit);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Interaction)
  async deleteInteraction(
    @UserEntity() user: User,
    @Args('id') interactionId: string,
  ) {
    return this.interactionsService.deleteInteraction(interactionId, user.id);
  }

  @Query(() => Object)
  async interactionAnalytics(
    @Args('targetId') targetId: string,
    @Args('targetType') targetType: TargetType,
  ) {
    return this.interactionsService.getInteractionAnalytics(targetId, targetType);
  }
} 