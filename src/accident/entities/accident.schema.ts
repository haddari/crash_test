import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Car } from 'src/car/entities/car.schema';
import { User } from 'src/user/entities/user.schema';

@Schema()
export class Accident extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Car', required: true })
  carId: Types.ObjectId; // Reference to the Car entity

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to the User entity

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  damageDetails: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  observations?: string;
}

export const AccidentSchema = SchemaFactory.createForClass(Accident);