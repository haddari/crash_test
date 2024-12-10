import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AssuranceService } from './assurance.service';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { UpdateAssuranceDto } from './dto/update-assurance.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('assurance')
export class AssuranceController {
  constructor(private readonly assuranceService: AssuranceService) {}

  @UseGuards(AuthenticationGuard)
    @Post('addassurance')
  async createAssurance(
    @Req() req,
    @Body() createAssuranceDto: { nameA: string; policeA: string; Agence: string, attestation: string },
  ) {

    return this.assuranceService.createAssurance(req.userId, createAssuranceDto);
  }

  @Get()
  findAll() {
    return this.assuranceService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get('user/:userId')
  async findUserAssurance(@Req() req) {
    return this.assuranceService.findUserAssurances(req.userId);
  }


 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssuranceDto: UpdateAssuranceDto) {
    return this.assuranceService.update(+id, updateAssuranceDto);
  }*/

    @Delete(':assuranceId')
    async deleteAssurance(@Param('assuranceId') assuranceId: string) {
      return this.assuranceService.deleteAssurance(assuranceId);
    }
}
