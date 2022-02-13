import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfigService } from './config/mongo/config.service';
import { DbConfigModule } from './config/mongo/config.module';
import { AppConfigModule } from './config/app/config.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { GroupModule } from './group/group.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule, DbConfigModule],
      useFactory: async (dbConfigService: DbConfigService) => ({
        uri: `mongodb+srv://${dbConfigService.username}:${dbConfigService.password}@${dbConfigService.host}/${dbConfigService.database}?retryWrites=true&w=majority`,
      }),
      inject: [DbConfigService],
    }),
    UserModule,
    UtilsModule,
    GroupModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
