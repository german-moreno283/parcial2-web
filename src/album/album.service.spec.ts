import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delete correctly' ,async ()=>{
    const album: AlbumEntity={
      id:"1",
      fechaInicio:new Date(),
      fechaFin: new Date(),
      titulo:"titulo",
      fotos:[]
    }
    await service.create(album);
    const deletionStatus = await service.delete(album.id);
    expect(deletionStatus).toBeTruthy();
  })
});
