import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from './foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

describe('FotoService', () => {
  let service: FotoService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deberia crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date(),
      archivo:"path/to/file",
      usuario:new UsuarioEntity,
      album:new AlbumEntity,
    }

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();
  })

  it('deberia fallar al crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:6500,
      velocidadObturacion:1,
      apertura:1,
      fecha:new Date(),
      archivo:"path/to/file",
      usuario:new UsuarioEntity,
      album:new AlbumEntity,
    }

    await expect(()=> service.createFoto(foto)).rejects.toHaveProperty("message","El iso no esta en el rango posible");
  })
});
