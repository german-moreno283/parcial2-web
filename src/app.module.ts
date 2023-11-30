import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialModule } from './red-social/red-social.module';
import { FotoModule } from './foto/foto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumModule } from './album/album.module';


@Module({
  imports: [//TODO Agregar Modulos so no estan auto
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial',
    entities: [/*TODO: importar entidades */],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), RedSocialModule, FotoModule, UsuarioModule, AlbumModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
