import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import config from './config';
import { MessageConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] })],
  providers: [ConfigService, MessageConfigService],
  exports: [ConfigService, MessageConfigService],
})
export class MsgConfigModule {}
