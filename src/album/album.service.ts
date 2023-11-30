import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { FotoEntity } from '../foto/foto.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>
  ){}

  async create(album:AlbumEntity){
    if (album.titulo.length===0)
      throw new BusinessLogicException("El titulo no puede estar vacio", BusinessError.PRECONDITION_FAILED)
    return await this.albumRepository.save(album);
  }

  async findAlbumById(albumId:string){
    const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['fotos']})
    if (!album)
      throw new BusinessLogicException("No se encontro el album", BusinessError.NOT_FOUND);
    return album;
  }

  async addPhotoToAlbum(albumId:string, fotoId:string){
    const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['fotos']})
    if (!album)
      throw new BusinessLogicException("No se encontro el album", BusinessError.NOT_FOUND);

    const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoId}, relations:['usuario', 'album']})
    if (!foto)
        throw new BusinessLogicException("No se encontro la foto", BusinessError.NOT_FOUND);
  
    if (foto.fecha<album.fechaInicio || foto.fecha > album.fechaFin)
      throw new BusinessLogicException("La foto no esta en el rango de fechas dado", BusinessError.PRECONDITION_FAILED);

    album.fotos = [...album.fotos, foto];
    return await this.albumRepository.save(album);
  }

  async delete(albumId:string){
    const album: AlbumEntity = await this.albumRepository.findOne({where:{id:albumId}, relations:['fotos']})
    if (!album)
      throw new BusinessLogicException("No se encontro el album", BusinessError.NOT_FOUND);
    if (album.fotos.length!==0)
      throw new BusinessLogicException("El album tiene fotos y no se puede eliminar", BusinessError.PRECONDITION_FAILED)
    await this.albumRepository.remove(album);
  }
}
