import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { ProduitModule } from './produit/produit.module';
import { OrderModule } from './order/order.module';
import { CarModule } from './car/car.module';
import { AssuranceModule } from './assurance/assurance.module';
import { AccidentModule } from './accident/accident.module';
import config from './config/config';

import { GemModule } from './gem/gem.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RolesModule,
    UserModule,
    ProduitModule,
    OrderModule,
    CarModule,
    AssuranceModule,
    AccidentModule,
    GemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
export class DatabaseModule {}

