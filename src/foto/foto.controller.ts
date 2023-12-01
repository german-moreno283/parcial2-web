import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto';
import { FotoEntity } from './foto.entity';
import { plainToInstance } from 'class-transformer';

@Controller('foto')
export class FotoController {
  constructor(
    private readonly fotoService: FotoService,
  ){}

  @Post()
  async create(@Body() fotoDto: FotoDto){
    const foto:FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.createFoto(foto);
  }
  
  @Get(':fotoId')
  async findOne(@Param('fotoId') fotoId:string){
    return await this.fotoService.findFotoById(fotoId);
  }

  @Get()
  async findAll(){
    return await this.fotoService.findAllFotos();
  }

  @Delete(':fotoId')
  async delete(@Param('fotoId') fotoId:string){
    return await this.fotoService.delete(fotoId)
  }

}
