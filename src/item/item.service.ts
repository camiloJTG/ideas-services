import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageConfigService } from 'src/config/messages/config.service';
import { GroupService } from 'src/group/group.service';
import { ResponseService } from 'src/utils/response.service';
import { CreateItemDto } from './dto/createItemDto';
import { ItemDocument } from './interfaces/item.interface';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private respSvc: ResponseService,
    private groupModel: GroupService,
    private msgConfig: MessageConfigService,
  ) {}

  // TODO: Service that create a item
  async createItem(createItemDto: CreateItemDto) {
    const { groupId } = createItemDto;

    const isMongoId = Types.ObjectId.isValid(groupId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findGroup = await this.groupModel.getOneGroup(groupId);
    if (!findGroup)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const newItem = new this.itemModel(createItemDto);
    return newItem.save();
  }

  // TODO: Service that delete a item
  async deleteItem(itemId: string) {
    const isMongoId = Types.ObjectId.isValid(itemId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const result = await this.itemModel.deleteOne({ _id: itemId });
    return result;
  }

  // TODO: Service that update a item
  async updateItem() {}
  // TODO: Service that get one item
  // TODO: Service that get all item by groupId
}
