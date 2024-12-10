// car.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/car/entities/car.schema';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { UserModule } from '../user/user.module';
import { AccidentModule } from '../accident/accident.module'; // Import UserModule
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    UserModule,AccidentModule,MulterModule.register({
      dest: './uploads', 
    }), 
  ],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
