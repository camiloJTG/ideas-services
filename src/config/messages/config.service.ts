import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageConfigService {
  constructor(private configService: ConfigService) {}

  get errorNotFound(): string {
    return this.configService.get<string>('msg.ERROR_NOT_FOUND');
  }
  get errorMailUser(): string {
    return this.configService.get<string>('msg.ERROR_MAIL_USERNAME');
  }
  get errorGroupName(): string {
    return this.configService.get<string>('msg.ERROR_GROUP_NAME');
  }
  get errorUserNotFound(): string {
    return this.configService.get<string>('msg.ERROR_USER_NOT_FOUND');
  }
}
