import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { UpdateAssuranceDto } from './dto/update-assurance.dto';
import { Assurance } from './entities/assurance.schema';
import { Types,Model,isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.schema';

@Injectable()
export class AssuranceService {
  constructor(
    @InjectModel(Assurance.name) private readonly assuranceModel: Model<Assurance>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createAssurance(userId: any, createAssuranceDto: { nameA: string; policeA: string; Agence: string, attestation: string }): Promise<Assurance> {
    // Validate the userId format
   /* if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }*/

    // Find the user by ID
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create a new car and associate it with the user
    const newAssurance = new this.assuranceModel({ ...createAssuranceDto, userId: userId });
    const assurance = await newAssurance.save();

    // Optionally, add the car reference to the user's list of cars
    user.assurances.push(assurance._id as Types.ObjectId);

    await user.save();

    return assurance;
  }


  findAll() {
    return `This action returns all assurance`;
  }

  async findUserAssurances(userId: string): Promise<Assurance[]> {
    // Validate the userId format
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.assuranceModel.find({ userId }).exec();
  }
  /*update(id: number, updateAssuranceDto: UpdateAssuranceDto) {
    return `This action updates a #${id} assurance`;
  }*/

    async deleteAssurance(assuranceId: string): Promise<void> {
      // Validate the assuranceId format
      if (!isValidObjectId(assuranceId)) {
        throw new BadRequestException('Invalid assurance ID format');
      }
  
      const assurance = await this.assuranceModel.findByIdAndDelete(assuranceId);
      if (!assurance) {
        throw new NotFoundException('assurance not found');
      }
  
      // Optionally remove the reference from the user's cars array if needed
      await this.userModel.findByIdAndUpdate(assurance.userId, { $pull: { assurances: assurance._id } });
    }
}
