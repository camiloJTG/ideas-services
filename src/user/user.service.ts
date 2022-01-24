import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/createUserDto';
import { UserDocument } from './interfaces/user.interface';
import { User } from './schemas/user.schema';
import { HashService } from '../utils/hash.service';
import { ResponseService } from '../utils/response.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
    private responseService: ResponseService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    const findUser = await this.userModel.find({
      $or: [{ username }, { email }],
    });
    if (findUser.length !== 0)
      this.responseService.exceptionResponse(
        HttpStatus.BAD_REQUEST,
        'The username or email has already registered',
      );

    const passHashed = await this.hashService.generateHash(password);
    createUserDto.password = passHashed;

    const newModel = new this.userModel(createUserDto);
    return await newModel.save();
  }
}
