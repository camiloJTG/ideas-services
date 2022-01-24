import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  get username(): string {
    return this.configService.get<string>('db.username');
  }
  get password(): string {
    return this.configService.get<string>('db.password');
  }
  get host(): string {
    return this.configService.get<string>('db.host');
  }
  get database(): string {
    return this.configService.get<string>('db.database');
  }
}
