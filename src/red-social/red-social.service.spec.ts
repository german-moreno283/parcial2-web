import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './red-social.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('RedSocialService', () => {
  let service: RedSocialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
