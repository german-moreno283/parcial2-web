import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from './red-social.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedSocialEntity } from './red-social.entity';

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

  it('Deberia crear una red social', async ()=>{
    const redsocial:RedSocialEntity = {
      id:"1",
      nombre:"facebook",
      slogan:"Es gratis y lo sera para siempre",
      usuarios:[]
    }
    const newRedsocial: RedSocialEntity = await service.createLibreria(redsocial);
    expect(newRedsocial).not.toBeNull();
  })

  it('Deberia fallar al crear una red social', async ()=>{
    const redsocial:RedSocialEntity = {
      id:"1",
      nombre:"facebook",
      slogan:"",
      usuarios:[]
    }
    await expect(()=> service.createLibreria(redsocial)).rejects.toHaveProperty("message","El slogan no puede estar vacio");
  })

});
