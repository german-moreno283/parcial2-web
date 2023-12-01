import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
import { plainToInstance } from 'class-transformer';
import { AlbumDto } from './album.dto';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
  constructor(
    private readonly albumService:AlbumService,
  ){}
  
  @Get(':albumId')
  async findOne(@Param('albumId') albumId:string){
    return await this.albumService.findAlbumById(albumId);
  }

  @Post()
  async create(@Body() albumDto:AlbumDto){
    const album: AlbumEntity = plainToInstance(AlbumEntity,albumDto);
    return await this.albumService.create(album);
  }

  @Delete(':albumId')
  @HttpCode(204)
  async delete(@Param('albumId') albumId:string){
    return await this.albumService.delete(albumId);
  }

  @Put(':albumId/fotos/:fotoId')
  async addPhotoToAlbum(@Param('albumId') albumId:string, @Param('fotoId') fotoId:string){
    return await this.albumService.addPhotoToAlbum(albumId, fotoId);
  }
}
