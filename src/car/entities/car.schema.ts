import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

@Schema()
export class Car extends Document {
  @Prop({ required: true, unique: true })
  matricule: string;

  @Prop({ required: true })
  type: string; 

  @Prop({ required: true, unique: true  })
  numch: number; 

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId; 

 
}

export const CarSchema = SchemaFactory.createForClass(Car);
