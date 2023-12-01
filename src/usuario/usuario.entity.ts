import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FotoEntity } from "../foto/foto.entity";
import { RedSocialEntity } from "../red-social/red-social.entity";

@Entity()
export class UsuarioEntity {

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  nombre:string;

  @Column()
  telefono:string;

  @OneToMany(()=>FotoEntity, foto=>foto.usuario)
  fotos: FotoEntity[];

  @ManyToOne(()=>RedSocialEntity, redsocial=>redsocial.usuarios)
  redsocial: RedSocialEntity;

}
