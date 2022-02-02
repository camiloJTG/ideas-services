import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User } from './schemas/user.schema';
import { MessageConfigService } from '../config/messages/config.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserDocument } from './interfaces/user.interface';
import { HashService } from '../utils/hash.service';
import { ResponseService } from '../utils/response.service';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,
    private respSvc: ResponseService,
    private msgConfig: MessageConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;

    const findUser = await this.userModel
      .find({
        $or: [{ username }, { email }],
      })
      .lean();
    if (findUser.length !== 0)
      return this.respSvc.exceptionResponse(400, this.msgConfig.errorMailUser);

    const passHashed = await this.hashService.generateHash(password);
    createUserDto.password = passHashed;

    const newModel = new this.userModel(createUserDto);
    return await newModel.save();
  }

  async findOneUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);
    }
    const findUser = await this.userModel.findById(id).lean();
    if (!findUser) return this.respSvc.exceptionResponse(404, 'Not found');
    return findUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { email, password, username } = updateUserDto;
    const isMongoId = Types.ObjectId.isValid(id);
    if (!isMongoId)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findUser = await this.userModel.findById(id).lean();
    if (!findUser)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorNotFound);

    const findByUsername = await this.userModel.find({ username }).lean();
    if (findByUsername.length !== 0)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorMailUser);

    const findByEmail = await this.userModel.find({ email }).lean();
    if (findByEmail.length !== 0)
      return this.respSvc.exceptionResponse(404, this.msgConfig.errorMailUser);

    if (password) {
      updateUserDto.password = await this.hashService.generateHash(password);
    }

    const result = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
      .lean();
    return result;
  }
}
