import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FotoDto {
  @IsNumber()
  @IsNotEmpty()
  ISO:number;

  @IsNumber()
  @IsNotEmpty()
  velocidadObturacion:number;

  @IsNumber()
  @IsNotEmpty()
  apertura:number;

  @IsDate()
  @IsNotEmpty()
  fecha:Date;

  @IsString()
  @IsNotEmpty()
  archivo:string;
}
