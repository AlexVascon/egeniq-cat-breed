import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/admin.strategy';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) { }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Put()
  updateCat(@Body() catDto: Partial<CatDto>): Promise<CatDto> {
    return this.catService.updateCat(catDto)
  }

  @UseGuards(AdminGuard)
  @Delete('/:uuid')
  deleteCat(@Param('uuid') uuid): void {
    this.catService.deleteCat(uuid)
  }
}
