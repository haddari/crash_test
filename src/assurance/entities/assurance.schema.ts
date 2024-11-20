import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

@Schema()
export class Assurance extends Document {
  @Prop({ required: true})
  nameA: string; 

  @Prop({ required: true })
  policeA: string; 

  @Prop({ required: true })
  Agence: string; 
  
  @Prop({ required: true })
  attestation: string; 

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const AssuranceSchema = SchemaFactory.createForClass(Assurance);
