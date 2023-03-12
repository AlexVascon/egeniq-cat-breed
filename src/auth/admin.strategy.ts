import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (this.configService.get('ADMIN_USERNAME') !== 'username' || this.configService.get('ADMIN_PASSWORD') !== 'password') {
      throw new UnauthorizedException();
    }

    return true
  }
}