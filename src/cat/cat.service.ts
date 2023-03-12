import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CatDto } from '../cat/dto/cat.dto';

@Injectable()
export class CatService {
  constructor(private readonly databaseService: DatabaseService) { }

  async createCat(catDto: CatDto): Promise<CatDto> {
    return await this.databaseService.cat.create({ data: catDto })
  }

  async getCats({ skip, take }: { skip: number, take: number }) {
    return await this.databaseService.cat.findMany({ skip, take })
  }

  async getCatByBreed(breed: string) {
    return await this.databaseService.cat.findFirst({ where: { breed } })
  }
}
