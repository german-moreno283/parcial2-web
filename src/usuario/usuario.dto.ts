import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre:string;

  @IsString()
  @IsNotEmpty()
  telefono:string;
}
