import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CatModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
