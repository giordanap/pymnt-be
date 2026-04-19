import { ConflictException, Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const existing = await this.prisma.profile.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException(
        `A profile with email "${dto.email}" already exists`,
      );
    }

    return this.prisma.profile.create({ data: dto });
  }
}
