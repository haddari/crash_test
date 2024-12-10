import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CarService } from './car.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(AuthenticationGuard)
  @Post('addcar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Directory to store uploaded files
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `car-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Allow only image files
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  async createCar(
    @Req() req,
    @Body() createCarDto: { matricule: string; type: string; numch: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File upload failed');
    }

    return this.carService.createCar(req.userId, {
      ...createCarDto,
      photo: `/uploads/${file.filename}`, // Save relative path in DB
    });
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
