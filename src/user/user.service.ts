import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private usermodel:Model<User>){}



async create(createUserDto: CreateUserDto) {
  const userModel = new  this.usermodel(createUserDto);
  const savedUser = await userModel.save();
  
  return {
    statusCode: HttpStatus.OK,
    data: savedUser,  // This contains the saved user information
  };}

  findAll() {
    return  this.usermodel.find().exec


  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
