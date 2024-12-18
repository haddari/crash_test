
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Car } from 'src/car/entities/car.schema';
import { User } from 'src/user/entities/user.schema'; // Import User schema for user-related operations

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createCar(
    userId: string,
    createCarDto: { matricule: string; type: string; numch: number;},
  ): Promise<Car> {
    // Validate the userId format
   /* if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }*/
  
    // Find the user by ID
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Create a new car and associate it with the user
    const newCar = new this.carModel({
      ...createCarDto,
      userId: userId,
    
    });
  
    const car = await newCar.save();
  
    // Add the car reference to the user's list of cars
    if (!user.cars) {
      user.cars = [];
    }
    user.cars.push(car._id as Types.ObjectId);
    await user.save();
  
    return car;
  }
  
  

  // Method to find all cars
  async findAllCars(): Promise<Car[]> {
    return this.carModel.find().populate('userId', 'name email').exec(); // Populating user info (name and email) if needed
  }

  // Method to find all cars belonging to a specific user
  async findUserCars(userId: string): Promise<Car[]> {
    // Validate the userId format
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }

    // Check if the user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.carModel.find({ userId }).exec();
  }

  // Method to delete a car by ID
  async deleteCar(carId: string): Promise<void> {
    // Validate the carId format
    if (!isValidObjectId(carId)) {
      throw new BadRequestException('Invalid car ID format');
    }

    const car = await this.carModel.findByIdAndDelete(carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    // Optionally remove the reference from the user's cars array if needed
    await this.userModel.findByIdAndUpdate(car.userId, { $pull: { cars: car._id } });
  }
}