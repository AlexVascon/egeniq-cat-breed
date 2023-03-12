import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { AdminGuard } from '../auth/admin.strategy';

@Module({
  providers: [CatService, AdminGuard],
  controllers: [CatController]
})
export class CatModule { }
