import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { groupParam, userParam } from 'src/group/dto/requestParams';
import { ResponseService } from 'src/utils/response.service';
import { CreateGroupDto } from './dto/createGroupDto';
import { Paginator } from './dto/queryParams';
import { UpdateGroupDto } from './dto/updateGroupDto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private responseService: ResponseService,
  ) {}

  @Post()
  async createGroup(@Body() createGroup: CreateGroupDto) {
    const result = await this.groupService.createGroup(createGroup);
    const resp = this.responseService.successResponse(
      HttpStatus.CREATED,
      result,
    );
    return resp;
  }

  @Put(':groupId')
  async updateGroup(
    @Param() params: groupParam,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const { groupId } = params;
    const result = await this.groupService.updateGroup(groupId, updateGroupDto);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Delete(':groupId')
  async deleteGroup(@Param() params: groupParam) {
    const { groupId } = params;
    const result = await this.groupService.deleteGroup(groupId);
    return result;
  }

  @Get(':groupId')
  async getOneGroup(@Param() params: groupParam) {
    const { groupId } = params;
    const result = await this.groupService.getOneGroup(groupId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Get('get-by-user/:userId')
  async getAllByUserId(@Param() params: userParam, @Query() query: Paginator) {
    const { userId } = params;
    const { cant, page } = query;
    const result = await this.groupService.getAllGroupByUser(
      userId,
      page,
      cant,
    );
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Get('get-group-and-item/:groupId')
  async getGroupAndItem(@Param() params: groupParam) {
    const { groupId } = params;
    const result = await this.groupService.getOneGroupWithItems(groupId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Get('get-groups-by-user/:userId')
  async getGroupByUserId(@Param() params: userParam) {
    const { userId } = params;
    const result = await this.groupService.getAllGroupByUserId(userId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }
}
