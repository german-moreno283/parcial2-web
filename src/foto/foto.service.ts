import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,

    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>
  ){}
  async createFoto(foto:FotoEntity){
    
    const valores = [foto.ISO, foto.velocidadObturacion, foto.apertura]
    const medio = [3250,126,16.5]
    let superan = 0;
    for (let i=0; i<3; i++){
      if (valores[i]>medio[i])
        superan++
    }
    if (superan>2)
      throw new BusinessLogicException("Hay más de 2 valores que superan el medio de las cotas", BusinessError.PRECONDITION_FAILED);

    if(foto.ISO<100 || foto.ISO>6400)
      throw new BusinessLogicException("El iso no esta en el rango posible", BusinessError.PRECONDITION_FAILED)
    
    if(foto.velocidadObturacion<2 || foto.velocidadObturacion>250)
      throw new BusinessLogicException("La velocidad no esta en el rango posible", BusinessError.PRECONDITION_FAILED)
    
    if(foto.apertura<1 || foto.apertura>32)
      throw new BusinessLogicException("La apertura no esta en el rango posible", BusinessError.PRECONDITION_FAILED)

    return await this.fotoRepository.save(foto);
  }

  async findFotoById(fotoId:string){
    const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoId}, relations:['album','usuario']})
    if (!foto)
      throw new BusinessLogicException("No se encontro la foto", BusinessError.NOT_FOUND);
    return foto;
  }

  async findAllFotos(){
    return await this.fotoRepository.find({relations:["album","usuario"]});
  }

  async delete(fotoId:string){
    const foto: FotoEntity = await this.fotoRepository.findOne({where:{id:fotoId}, relations:['album','usuario']})
    if (!foto)
      throw new BusinessLogicException("No se encontro la foto", BusinessError.NOT_FOUND);
    
    if(foto.album){
    const album: AlbumEntity = await this.albumRepository.findOne({where:{id:foto.album.id},relations:["fotos"]})
        if(album.fotos.length===1)
          this.albumRepository.remove(foto.album);
    }    
    this.fotoRepository.remove(foto);
    return true;
  }
}
