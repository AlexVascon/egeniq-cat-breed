import { IsNumber, IsString } from "class-validator";

export class CatDto {

  @IsString()
  breed: string

  @IsNumber()
  weight: number

  @IsString()
  temperament: string

  @IsString()
  origin: string

  @IsString()
  description: string

  @IsString()
  image: string

}