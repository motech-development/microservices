import { Test } from '@nestjs/testing';
import PrismaService from '../prisma.service';

describe('prisma.service', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = app.get(PrismaService);

    prismaService.$connect = jest.fn();
    prismaService.$disconnect = jest.fn();
  });

  it('should call $connect onModuleInit', async () => {
    await prismaService.onModuleInit();

    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it('should call $disconnect onModuleDestroy', async () => {
    await prismaService.onModuleDestroy();

    expect(prismaService.$disconnect).toHaveBeenCalled();
  });
});
