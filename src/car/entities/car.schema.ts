import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

@Schema()
export class Car extends Document {
  @Prop({ required: true, unique: true })
  matricule: string; // Unique identifier for a car, like a license plate number.

  @Prop({ required: true })
  type: string; // Car type (e.g., sedan, SUV, etc.).

  @Prop({ required: true, unique: true  })
  numch: number; // Integer value (e.g., number of horsepower or any other relevant detail).

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId; // References the User that owns this car.

  @Prop({ type: String, default: null })
  photo: string; 

}

export const CarSchema = SchemaFactory.createForClass(Car);
