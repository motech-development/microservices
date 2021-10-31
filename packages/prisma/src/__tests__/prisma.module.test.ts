import { Test } from '@nestjs/testing';
import PrismaModule from '../prisma.module';
import PrismaService from '../prisma.service';

describe('prisma.module', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();

    prismaService = app.get(PrismaService);
  });

  it('should contain the correct providers', () => {
    expect(prismaService).toBeDefined();
  });
});
