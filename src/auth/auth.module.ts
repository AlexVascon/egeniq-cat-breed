import { Module } from '@nestjs/common';
import { AdminGuard } from './admin.strategy';

@Module({
  providers: [AdminGuard]
})
export class AuthModule {
}
