import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Assurance, AssuranceSchema } from 'src/assurance/entities/assurance.schema';
import { AssuranceService } from 'src/assurance/assurance.service';
import { AssuranceController } from './Assurance.controller';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assurance.name, schema: AssuranceSchema }]),
    UserModule, // Import UserModule to access UserModel
  ],
  providers: [AssuranceService],
  controllers: [AssuranceController],
})
export class AssuranceModule {}
