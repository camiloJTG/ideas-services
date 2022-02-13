import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageConfigService } from 'src/config/messages/config.service';
import { ResponseService } from 'src/utils/response.service';
import { UserService } from '../user/user.service';
import { CreateGroupDto } from './dto/createGroupDto';
import { UpdateGroupDto } from './dto/updateGroupDto';
import { GroupDocument } from './interfaces/group.interface';
import { Group } from './schemas/group.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private respSvc: ResponseService,
    private msgConfig: MessageConfigService,
    private userService: UserService,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const { name, userId } = createGroupDto;

    const findByName = await this.groupModel.find({ name });
    if (findByName.length !== 0)
      return this.respSvc.exceptionResponse(400, this.msgConfig.errorGroupName);

    const isUserValid = await this.userService.findOneUser(userId);
    if (!isUserValid)
      return this.respSvc.exceptionResponse(
        404,
        this.msgConfig.errorUserNotFound,
      );

    const newGroup = new this.groupModel(createGroupDto);
    return newGroup.save();
  }

  // TODO Service that delete a group

  async updateGroup(groupId: string, updateGroupDto: UpdateGroupDto) {
    const { name } = updateGroupDto;
    const isMongoId = Types.ObjectId.isValid(groupId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findGroup = await this.groupModel.findById(groupId).lean();
    if (!findGroup)
      return this.respSvc.exceptionResponse(400, this.msgConfig.errorNotFound);

    if (name) {
      const findByName = await this.groupModel.find({ name }).lean();
      if (findByName.length !== 0)
        return this.respSvc.exceptionResponse(
          400,
          this.msgConfig.errorGroupName,
        );
    }

    updateGroupDto.updatedAt = new Date();
    const result = await this.groupModel.findOneAndUpdate(
      { _id: groupId },
      updateGroupDto,
      { new: true },
    );
    return result;
  }

  async getOneGroup(groupId: string) {
    const isMongoId = Types.ObjectId.isValid(groupId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findGroup = await this.groupModel.findById(groupId).lean();
    if (!findGroup)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);
    return findGroup;
  }

  async getAllGroupByUser(
    userId: string,
    skip: number = 0,
    limit: number = 10,
  ) {
    const isMongoId = Types.ObjectId.isValid(userId);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const count = await this.groupModel.find({ userId }).count();
    const findGroups = await this.groupModel
      .find({ userId }, {}, { skip, limit })
      .lean();
    if (findGroups.length === 0)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    return { findGroups, count };
  }

  // TODO Service that get one group with its items
  // TODO Service that get all groups with its items (paginated)
}
