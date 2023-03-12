import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CatDto } from '../cat/dto/cat.dto';

@Injectable()
export class CatService {
  constructor(private readonly databaseService: DatabaseService) { }

  async createCat(catDto: CatDto): Promise<CatDto> {
    return await this.databaseService.cat.create({ data: catDto })
  }

  async getCats({ skip, take }: { skip: number, take: number }) {
    if (take > 50) take = 50
    return await this.databaseService.cat.findMany({ skip, take })
  }

  async getCatByBreed(breed: string) {
    const cat = await this.databaseService.cat.findFirst({ where: { breed } })
    if (!cat) throw new NotFoundException('cat breed does not exist')
    return cat
  }

  async updateCat(update: Partial<CatDto>): Promise<CatDto> {
    if (!update.breed) throw new BadRequestException('field "breed" is required')
    return await this.databaseService.cat.update({ where: { breed: update.breed }, data: update })
  }

  async deleteCat(uuid: string): Promise<void> {
    await this.databaseService.cat.delete({ where: { id: uuid } })
  }
}
