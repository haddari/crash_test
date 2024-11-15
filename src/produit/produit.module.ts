import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit, ProduitSchema } from './entities/produit.entity';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [ProduitController],
  providers: [ProduitService],
  imports: [MongooseModule.forFeature([{ name: Produit.name, schema: ProduitSchema }])],

})
export class ProduitModule {}
