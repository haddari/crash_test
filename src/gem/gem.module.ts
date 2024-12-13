import { Module } from '@nestjs/common';
import { GemService } from './gem.service';
import { GemController } from './gem.controller';
import {OCRServiceextraction } from './ocrextraction'
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  controllers: [GemController],
  providers: [GemService,OCRServiceextraction]
})
export class GemModule {}
