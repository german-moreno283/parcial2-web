import { IsNotEmpty, IsString } from "class-validator";

export class RedSocialDto {
  @IsString()
  @IsNotEmpty()
  nombre:string;

  @IsString()
  @IsNotEmpty()
  slogan:string;
}
