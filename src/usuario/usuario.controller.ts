import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { plainToInstance } from 'class-transformer';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ){}

  @Post()
  async create(@Body() usuarioDto:UsuarioDto){
    const usuario:UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.createUsuario(usuario);
  }

  @Get(':usuarioId')
  async findOne(@Param('usuarioId') usuarioId:string){
    return await this.usuarioService.findUsuarioById(usuarioId);
  }

  @Get()
  async findAll(){
    return await this.usuarioService.findAllUsuarios();
  }
}
