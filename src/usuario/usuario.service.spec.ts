import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from './usuario.entity';
import { FotoEntity } from '../foto/foto.entity';
import { RedSocialEntity } from '../red-social/red-social.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia crear un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"paco",
      telefono:"1112223333",
      fotos:[new FotoEntity()],
      redsocial:new RedSocialEntity()
    }
    const newUsuario: UsuarioEntity = await service.createUsuario(usuario);
    expect(newUsuario).not.toBeNull();
  })

  it('Deberia fallar al crear un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"paco",
      telefono:"11112223333",
      fotos:[new FotoEntity()],
      redsocial:new RedSocialEntity()
    }
    await expect(()=> service.createUsuario(usuario)).rejects.toHaveProperty("message","Numero de telefono invalido");
  })

  it('Deberia encontrar un usuario', async ()=>{
    const usuario:UsuarioEntity = {
      id:"1",
      nombre:"paco",
      telefono:"1112223333",
      fotos:[new FotoEntity()],
      redsocial:new RedSocialEntity()
    }
    await service.createUsuario(usuario);
    const foundUser:UsuarioEntity = await service.findUsuarioById(usuario.id);
    expect(foundUser).not.toBeNull();
  })

  it('Deberia fallar encontrar un usuario', async ()=>{
    await expect(()=> service.findUsuarioById("2")).rejects.toHaveProperty("message", "No se encontro el usuario")
  })

  it('Deberia encontrar a todos los usuarios', async ()=>{
    const foundUsers:UsuarioEntity[] = await service.findAllUsuarios();
    expect(foundUsers).not.toBeNull();
  })
});
