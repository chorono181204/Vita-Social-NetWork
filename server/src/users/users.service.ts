import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from '../auth/password.service';
import { ChangePasswordInput } from './inputs/change-password.input';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  async updateUser(userId: string, newUserData: UpdateUserInput) {
    // Create profile if it doesn't exist
    const existingProfile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      return this.prisma.userProfile.create({
        data: {
          userId,
          ...newUserData,
        },
        include: {
          user: true,
        },
      });
    }

    // Update existing profile
    return this.prisma.userProfile.update({
      where: { userId },
      data: newUserData,
      include: {
        user: true,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
      include: {
        profile: true,
      },
    });
  }
}
