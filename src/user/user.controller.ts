import { Body, Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { ResponseService } from '../utils/response.service';
import { CreateUserDto } from './dto/createUserDto';
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
}
