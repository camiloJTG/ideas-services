import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { groupParam, itemParam } from 'src/item/dto/requestParams';
import { RequestParams } from 'src/user/dto/requestParams';
import { ResponseService } from 'src/utils/response.service';
import { CreateItemDto } from './dto/createItemDto';
import { UpdateItemDto } from './dto/updateItemDto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(
    private itemService: ItemService,
    private responseService: ResponseService,
  ) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    const result = await this.itemService.createItem(createItemDto);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Delete(':itemId')
  async deleteItem(@Param() params: itemParam) {
    const { itemId } = params;
    const result = await this.itemService.deleteItem(itemId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Put(':itemId')
  async updateItem(
    @Param() params: itemParam,
    @Body() itemUpdateDto: UpdateItemDto,
  ) {
    const { itemId } = params;
    const result = await this.itemService.updateItem(itemId, itemUpdateDto);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Get(':itemId')
  async getOneItem(@Param() params: itemParam) {
    const { itemId } = params;
    const result = await this.itemService.getOneItem(itemId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Get('search-by-group/:groupId')
  async getByGroupId(@Param() params: groupParam) {
    const { groupId } = params;
    const result = await this.itemService.getByGroupId(groupId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }
}
