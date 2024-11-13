import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Produit>;

@Schema()


export class Produit {

    @Prop()
    ref: string;
  
    @Prop()
    label: number;
  
    @Prop()
    price: string;
}
export const ProduitSchema = SchemaFactory.createForClass(Produit);
