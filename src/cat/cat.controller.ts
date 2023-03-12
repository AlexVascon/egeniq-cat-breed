import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
}
