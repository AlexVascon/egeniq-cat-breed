import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [CatModule, DatabaseModule, AuthModule, ConfigModule.forRoot({ isGlobal: true, })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
