import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accident } from './entities/accident.schema';
import { Car } from 'src/car/entities/car.schema';
import { User } from 'src/user/entities/user.schema';
import * as PDFDocument from 'pdfkit'; 
import { Response } from 'express';

import { Assurance } from 'src/assurance/entities/assurance.schema';


@Injectable()
export class AccidentService {
  constructor(
    @InjectModel(Accident.name) private readonly accidentModel: Model<Accident>,
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel('Assurance') private readonly assuranceModel: Model<Assurance>,
  ) {}

  async createAccident(
    userId: string,
    carId: string,
    accidentDto: {
      location: string;
      date: Date;
      damageDetails: string;
      observations?: string;
    },
  ): Promise<Accident> {
    // Check if the user exists
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the car exists and belongs to the user
    const car = await this.carModel.findById(carId);
    if (!car || car.userId.toString() !== userId) {
      throw new NotFoundException('Car not found or does not belong to this user');
    }

    // Create the accident record
    const newAccident = new this.accidentModel({
      userId,
      carId,
      ...accidentDto,
    });

    const savedAccident = await newAccident.save();

    // Optionally, you can link this accident to the user's accident history
    return savedAccident;
  }

  async getUserAccidents(userId: string): Promise<Accident[]> {
    const accidents = await this.accidentModel.find({ userId }).populate('carId');
    if (!accidents) {
      throw new NotFoundException('No accidents found for this user');
    }
    return accidents;
  }

  async getAccidentById(accidentId: string): Promise<Accident> {
    const accident = await this.accidentModel.findById(accidentId).populate('carId userId');
    if (!accident) {
      throw new NotFoundException('Accident not found');
    }
    return accident;
  }
  async generateAccidentPdf(accidentId: string, res: Response): Promise<void> {
    const accident = await this.accidentModel
      .findById(accidentId)
      .populate<{ carId: Car }>('carId') // Use populated types
      .populate<{ userId: User }>('userId');
  
    if (!accident) {
      throw new NotFoundException('Accident not found');
    }
  
    const car = accident.carId; // Now TypeScript knows carId is a Car
    const user = accident.userId;
  
    // Fetch associated assurance information for the user
    const assurance = await this.assuranceModel.findOne({ userId: user._id });
  
    // Create a PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 30 });
  
    // Pipe the PDF to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=accident_${accidentId}.pdf`,
    );
    doc.pipe(res);
    
  
    // Header
    doc.fontSize(20).text('Constat Amiable d\'Accident Automobile', { align: 'center' });
    doc.moveDown(1);
  
    // Accident Details Section
    doc.fontSize(14).text('Accident Details:', { underline: true });
  
    doc.text(`Location: ${accident.location}`);
    doc.text(`Date: ${new Date(accident.date).toLocaleString()}`);
    doc.text(`Damage Details: ${accident.damageDetails}`);
    doc.moveDown();
  
    // Vehicle Section
    doc.fontSize(14).text('Vehicle Information:', { underline: true });
    doc.text(`Matricule: ${car.matricule}`);
    doc.text(`Type: ${car.type}`);
    doc.text(`NumCh: ${car.numch}`);
    doc.text(`Owner Name: ${user.name}`);
    doc.text(`Owner Permi: ${user.permi}`);
    doc.moveDown();
  
    // Assurance Section
    doc.fontSize(14).text('Assurance Information:', { underline: true });
    if (assurance) {
      doc.text(`Insurance Name: ${assurance.nameA}`);
      doc.text(`Policy Number: ${assurance.policeA}`);
      doc.text(`Agency: ${assurance.Agence}`);
      doc.text(`Attestation: ${assurance.attestation}`);
    } else {
      doc.text('No assurance information found for this user.');
    }
    doc.moveDown();
  
    // Observations Section
    doc.fontSize(14).text('Observations:', { underline: true });
    doc.text(accident.observations || 'No additional observations.');
    doc.moveDown();
  
    // Add signatures section
    doc.moveDown(2).text('Signatures:', { underline: true });
    doc.text('Owner Signature: ___________________________');
    doc.text('Witness Signature: _________________________');
  
    // Finalize and close the PDF
    doc.end();
  }
  
}
