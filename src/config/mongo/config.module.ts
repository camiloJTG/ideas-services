import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import config from './config';
import { DbConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: joi.object({
        MONGO_USER: joi.string().required().trim(),
        MONGO_PASSWORD: joi.string().required().trim(),
        MONGO_HOST: joi.string().required().trim(),
        MONGO_DATABASE: joi.string().required().trim(),
      }),
    }),
  ],
  providers: [ConfigService, DbConfigService],
  exports: [ConfigService, DbConfigService],
})
export class DbConfigModule {}
