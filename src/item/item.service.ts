import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageConfigService } from 'src/config/messages/config.service';
import { GroupService } from 'src/group/group.service';
import { ResponseService } from 'src/utils/response.service';
import { CreateItemDto } from './dto/createItemDto';
import { UpdateItemDto } from './dto/updateItemDto';
import { ItemDocument } from './interfaces/item.interface';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private respSvc: ResponseService,
    @Inject(forwardRef(() => GroupService))
    private groupModel: GroupService,
    private msgConfig: MessageConfigService,
  ) {}

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

  async deleteItem(itemId: string) {
    const isMongoId = Types.ObjectId.isValid(itemId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const result = await this.itemModel.deleteOne({ _id: itemId });
    return result;
  }

  async updateItem(itemId: string, updateItemDto: UpdateItemDto) {
    const isMongoId = Types.ObjectId.isValid(itemId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findById = await this.itemModel.findById(itemId).lean();
    if (!findById)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    updateItemDto.updatedAt = new Date();
    const result = await this.itemModel.findByIdAndUpdate(
      itemId,
      updateItemDto,
      { new: true },
    );

    return result;
  }

  async getOneItem(itemId: string) {
    const isMongoId = Types.ObjectId.isValid(itemId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findItem = await this.itemModel.findById(itemId).lean();
    if (!findItem)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    return findItem;
  }

  async getByGroupId(groupId: string) {
    const isMongoId = Types.ObjectId.isValid(groupId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findItem = await this.itemModel
      .find({ groupId })
      .populate('group')
      .lean();
    if (findItem.length === 0)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    return findItem;
  }

  async deleteByGroup(groupId: string) {
    const isMongoId = Types.ObjectId.isValid(groupId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const result = await this.itemModel.deleteMany({ groupId });
    return result;
  }
}
