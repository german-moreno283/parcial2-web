import { Test, TestingModule } from '@nestjs/testing';
import { FotoService } from './foto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from './foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';
import { AlbumService } from '../album/album.service';

describe('FotoService', () => {
  let service: FotoService;
  let albumService: AlbumService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [FotoService, AlbumService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    albumService = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date(),
      archivo:"path/to/file",
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }

    const newFoto: FotoEntity = await service.createFoto(foto);
    expect(newFoto).not.toBeNull();
  })

  it('Deberia fallar al crear una foto',async ()=>{
    const foto:FotoEntity = {
      id:"",
      ISO:6500,
      velocidadObturacion:1,
      apertura:1,
      fecha:new Date(),
      archivo:"path/to/file",
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }

    await expect(()=> service.createFoto(foto)).rejects.toHaveProperty("message","El iso no esta en el rango posible");
  })

  it('Deberia eliminar una foto', async()=>{
    const albumTest:AlbumEntity = {
      id:"1",
      fechaInicio:new Date("2019-03-03"),
      fechaFin: new Date("2023-12-12"),
      titulo:"album",
      fotos:[new FotoEntity()]
    }
    await albumService.create(albumTest);
    const foto:FotoEntity = {
      id:"1",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date("2022-03-03"),
      archivo:"path/to/file",
      usuario:new UsuarioEntity(),
      album:albumTest,
    }

    await service.createFoto(foto);
    const deletionStatus = await service.delete(foto.id);
    expect(deletionStatus).toBeTruthy();
  })

  it('Deberia fallar al eliminar una foto', async()=>{
    await expect(() => service.delete("2")).rejects.toHaveProperty("message","No se encontro la foto");
  })

  it('Deberia encontrar una foto', async()=>{
    const fotoTest:FotoEntity = {
      id:"1",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date(),
      archivo:"path/to/file",
      usuario:new UsuarioEntity(),
      album:new AlbumEntity(),
    }
    await service.createFoto(fotoTest);
    const foto:FotoEntity = await service.findFotoById("1");
    expect(foto).not.toBeNull();
  })

  it('Deberia fallar al encontrar una foto', async()=>{
    await expect(()=>service.findFotoById("1")).rejects.toHaveProperty("message","No se encontro la foto"); 
  })

  it('Deberia encontrar todas las fotos', async()=>{
    const fotos: FotoEntity[] = await service.findAllFotos();
    expect(fotos).not.toBeNull();
  })
});
