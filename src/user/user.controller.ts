import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ResponseService } from '../utils/response.service';
import { CreateUserDto } from './dto/createUserDto';
import { RequestParams } from './dto/requestParams';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
  ) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    const result = await this.userService.createUser(createUser);
    const resp = this.responseService.successResponse(
      HttpStatus.CREATED,
      result,
    );
    return resp;
  }

  @Get(':userId')
  async getOneUser(@Param() params: RequestParams) {
    const { userId } = params;
    const result = await this.userService.findOneUser(userId);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }

  @Put(':userId')
  async updateUser(
    @Param() params: RequestParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { userId } = params;
    const result = await this.userService.updateUser(userId, updateUserDto);
    const resp = this.responseService.successResponse(HttpStatus.OK, result);
    return resp;
  }
}
