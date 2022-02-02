import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/utils/utils.module';
import { MsgConfigModule } from '../config/messages/config.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UtilsModule,
    MsgConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
