import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) { }

  @Post()
  createCat(@Body() catDto: CatDto): Promise<CatDto> {
    return this.catService.createCat(catDto)
  }

  @Get()
  getCats(@Query() { skip, take }: { skip: number, take: number }): Promise<CatDto[]> {
    return this.catService.getCats({ skip, take })
  }

  @Get('/:breed')
  getCatByBreed(@Param('breed') breed): Promise<CatDto> {
    return this.catService.getCatByBreed(breed)
  }

  @Put()
  updateCat(@Body() catDto: CatDto): Promise<CatDto> {
    return this.catService.updateCat(catDto)
  }
}
