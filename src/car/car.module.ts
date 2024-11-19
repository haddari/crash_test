// car.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/car/entities/car.schema';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    UserModule, // Import UserModule to access UserModel
  ],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
