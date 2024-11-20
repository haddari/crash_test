import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import {Car} from 'src/car/entities/car.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  permi: string;

  @Prop({ required: false, type: SchemaTypes.ObjectId })
  roleId: Types.ObjectId;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Car' }] })
cars: Types.ObjectId[];

@Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Car' }] })
assurances: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
