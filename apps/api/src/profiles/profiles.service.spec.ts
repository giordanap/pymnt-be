import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';

// Minimal Prisma mock — only the methods the service calls
const mockPrisma = {
  profile: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const createDto = {
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@example.com',
  bio: 'Software engineer',
};

const storedProfile = {
  id: 'uuid-1',
  ...createDto,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  describe('create()', () => {
    it('creates and returns a profile when the email is new', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      mockPrisma.profile.create.mockResolvedValue(storedProfile);

      const result = await service.create(createDto);

      expect(mockPrisma.profile.findUnique).toHaveBeenCalledWith({
        where: { email: createDto.email },
      });
      expect(mockPrisma.profile.create).toHaveBeenCalledWith({ data: createDto });
      expect(result).toEqual(storedProfile);
    });

    it('throws ConflictException when email already exists', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(storedProfile);

      await expect(service.create(createDto)).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(mockPrisma.profile.create).not.toHaveBeenCalled();
    });

    it('creates a profile without bio when bio is omitted', async () => {
      const dtoNoBio = { firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com' };
      const profileNoBio = { id: 'uuid-2', ...dtoNoBio, bio: null, createdAt: new Date(), updatedAt: new Date() };

      mockPrisma.profile.findUnique.mockResolvedValue(null);
      mockPrisma.profile.create.mockResolvedValue(profileNoBio);

      const result = await service.create(dtoNoBio);
      expect(result.bio).toBeNull();
    });
  });
});
