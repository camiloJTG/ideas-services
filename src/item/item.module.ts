import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MsgConfigModule } from 'src/config/messages/config.module';
import { GroupModule } from 'src/group/group.module';
import { UtilsModule } from 'src/utils/utils.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MsgConfigModule,
    forwardRef(() => GroupModule),
    UtilsModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
