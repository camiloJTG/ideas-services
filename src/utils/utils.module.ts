import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { ResponseService } from './response.service';
import { AppConfigModule } from '../config/app/config.module';
@Module({
  imports: [AppConfigModule],
  providers: [HashService, ResponseService],
  exports: [HashService, ResponseService],
})
export class UtilsModule {}
