import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Produit } from 'src/produit/entities/produit.entity';
import { User } from 'src/user/entities/user.schema';

export type CatDocument = HydratedDocument<Order>;

@Schema()
export class Order {


    @Prop()
    name: string;
  
    @Prop()
    number: number;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' })
    peoduits: Produit[];
    




}
