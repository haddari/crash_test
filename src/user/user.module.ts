import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User ,UserSchema } from './entities/user.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UserController],
  providers: [UserService],

  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],

})
export class UserModule {}
