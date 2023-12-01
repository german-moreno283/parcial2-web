import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { FotoService } from '../foto/foto.service';

describe('AlbumService', () => {
  let service: AlbumService;
  let fotoService: FotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [AlbumService, FotoService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    fotoService = module.get<FotoService>(FotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear un album' ,async ()=>{
    const album: AlbumEntity={
      id:"1",
      fechaInicio:new Date(),
      fechaFin: new Date(),
      titulo:"titulo",
      fotos:[]
    }
    const newAlbum:AlbumEntity = await service.create(album);

    expect(newAlbum).not.toBeNull();
  })

  it('Deberia fallar al crear un album' ,async ()=>{
    const album: AlbumEntity={
      id:"1",
      fechaInicio:new Date(),
      fechaFin: new Date(),
      titulo:"",
      fotos:[]
    }
    await expect(()=> service.create(album)).rejects.toHaveProperty("message","El titulo no puede estar vacio");
  })

  it('Deberia encontrar un album', async()=>{
    const albumTest:AlbumEntity = {
      id:"1",
      fechaInicio:new Date(),
      fechaFin: new Date(),
      titulo:"titulo",
      fotos:[]
    }
    await service.create(albumTest);
    const album:AlbumEntity = await service.findAlbumById(albumTest.id);
    expect(album).not.toBeNull();
  })

  it('Deberia fallar al encontrar un album', async()=>{
    await expect(()=>service.findAlbumById("id")).rejects.toHaveProperty("message","No se encontro el album"); 
  })

  it('Deberia encontrar un album', async()=>{
    const albumTest:AlbumEntity = {
      id:"1",
      fechaInicio:new Date(),
      fechaFin: new Date(),
      titulo:"titulo",
      fotos:[]
    }
    await service.create(albumTest);
    const album:AlbumEntity = await service.findAlbumById(albumTest.id);
    expect(album).not.toBeNull();
  })

  it('Deberia agregar una foto a un album' ,async ()=>{

    const album:AlbumEntity = {
      id:"1",
      fechaInicio:new Date("2019-03-03"),
      fechaFin: new Date("2023-12-12"),
      titulo:"album",
      fotos:[]
    }
    await service.create(album);
    const foto:FotoEntity = {
      id:"1",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date("2022-03-03"),
      archivo:"path/to/file",
      usuario:null,
      album:null,
    }
    await service.create(album);
    await fotoService.createFoto(foto);
    const newAlbum:AlbumEntity = await service.addPhotoToAlbum(album.id,foto.id);
    expect(newAlbum).not.toBeNull();
  })

  it('Deberia agregar una foto a un album' ,async ()=>{

    const album:AlbumEntity = {
      id:"1",
      fechaInicio:new Date("2019-03-03"),
      fechaFin: new Date("2023-12-12"),
      titulo:"album",
      fotos:[]
    }
    await service.create(album);
    const foto:FotoEntity = {
      id:"1",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date("2018-03-03"),
      archivo:"path/to/file",
      usuario:null,
      album:null,
    }
    await service.create(album);
    await fotoService.createFoto(foto);
    await expect (()=>service.addPhotoToAlbum(album.id,foto.id)).rejects.toHaveProperty("message","La foto no esta en el rango de fechas dado");
  })




  it('Deberia eliminar un album' ,async ()=>{
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

  it('Deberia fallar al eliminar un album' ,async ()=>{

    const album:AlbumEntity = {
      id:"1",
      fechaInicio:new Date("2019-03-03"),
      fechaFin: new Date("2023-12-12"),
      titulo:"album",
      fotos:[]
    }
    await service.create(album);
    const foto:FotoEntity = {
      id:"1",
      ISO:200,
      velocidadObturacion:3,
      apertura:3,
      fecha:new Date("2022-03-03"),
      archivo:"path/to/file",
      usuario:null,
      album:album,
    }
    await service.create(album);
    await fotoService.createFoto(foto);
    await expect(()=>service.delete(album.id)).rejects.toHaveProperty("message","El album tiene fotos y no se puede eliminar");
    
  })
});
