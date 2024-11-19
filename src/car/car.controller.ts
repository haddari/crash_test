import { Controller, Post, Body, Param, Get, Delete, UseGuards,Req } from '@nestjs/common';
import { CarService } from './car.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(AuthenticationGuard)
    @Post('addcar')
  async createCar(
    @Req() req,
    @Body() createCarDto: { matricule: string; type: string; numch: number },
  ) {

    return this.carService.createCar(req.userId, createCarDto);
  }

  @Get()
  async findAll() {
    return this.carService.findAllCars();
  }
  @UseGuards(AuthenticationGuard)
  @Get('user/:userId')
  async findUserCars(@Req() req) {
    return this.carService.findUserCars(req.userId);
  }

  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string) {
    return this.carService.deleteCar(carId);
  }
}
