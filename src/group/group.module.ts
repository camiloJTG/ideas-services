import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MsgConfigModule } from 'src/config/messages/config.module';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';
import { UtilsModule } from 'src/utils/utils.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group, GroupSchema } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    UtilsModule,
    MsgConfigModule,
    UserModule,
    ItemModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
