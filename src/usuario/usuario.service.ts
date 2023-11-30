import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ){}

  async createUsuario(usuario:UsuarioEntity){
    if (usuario.telefono.length!==10)
      throw new BusinessLogicException("Numero de telefono invalido", BusinessError.PRECONDITION_FAILED)
    return await this.usuarioRepository.save(usuario);
  }

  async findUsuarioById(usuarioId:string){
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where:{id:usuarioId}, relations:['fotos','redsocial']})
    if (!usuario)
      throw new BusinessLogicException("No se encontro el album", BusinessError.NOT_FOUND);
    return usuario;
  }

  async findAllUsuarios(){
    return await this.usuarioRepository.find({relations:["fotos","redsocial"]});
  }
}
