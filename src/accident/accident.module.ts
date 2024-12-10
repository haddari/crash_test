import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accident, AccidentSchema } from 'src/accident/entities/accident.schema';
import { AccidentService } from 'src/accident/accident.service';
import { AccidentController } from './Accident.controller';
import { UserModule } from '../user/user.module';
import { CarModule } from '../car/car.module'; // Import UserModule
import { CarSchema } from 'src/car/entities/car.schema';
import { UserSchema } from 'src/user/entities/user.schema';
import { AssuranceSchema } from 'src/assurance/entities/assurance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Accident', schema: AccidentSchema },
      { name: 'Car', schema: CarSchema }, // Add this line if missing
      { name: 'User', schema: UserSchema },
      { name: 'Assurance', schema: AssuranceSchema },
    ]),  UserModule,AccidentModule
  ],
  providers: [AccidentService],
  controllers: [AccidentController],
  exports: [AccidentService], // Export service if needed elsewhere
})
export class AccidentModule {}