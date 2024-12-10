import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Response } from 'express';

@Controller('accidents')
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}

  // Create an accident report
  @UseGuards(AuthenticationGuard)
  @Post('create/:carId')
  async createAccident(
    @Req() req,
    @Param('carId') carId: string,
    @Body()
    accidentDto: {
      location: string;
      date: Date;
      damageDetails: string;
      observations?: string;
    },
  ) {
    const userId = req.userId; // Extracted from authentication token
    return this.accidentService.createAccident(userId, carId, accidentDto);
  }


  @UseGuards(AuthenticationGuard)
  @Get('pdf/:accidentId')
  async generatePdf(
    @Param('accidentId') accidentId: string,
    @Res() res: Response, // Explicitly use express.Response
  ) {
    await this.accidentService.generateAccidentPdf(accidentId, res);
    // Do not return anything after sending the response
  }

  // Get all accidents for a logged-in user
 
  @UseGuards(AuthenticationGuard)
  @Get('user')
  async getUserAccidents(@Req() req) {
    const userId = req.userId; // Extracted from authentication token
    return this.accidentService.getUserAccidents(userId);
  }

  // Get a specific accident by ID
  @UseGuards(AuthenticationGuard)
  @Get(':accidentId')
  async getAccidentById(@Param('accidentId') accidentId: string) {
    return this.accidentService.getAccidentById(accidentId);
  }
}
