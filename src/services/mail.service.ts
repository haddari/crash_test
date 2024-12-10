import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
 
    private transporter;
  
    constructor() {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Utilisez false pour TLS
        auth: {
          user: 'saropez.pro@gmail.com',  // Remplacez par votre email
          pass: 'jeme pnsy huta totz', // Remplacez par le mot de passe d'application
        },
      });
    }
  
    // Fonction pour générer un code aléatoire entre 0 et 1000
    private generateRandomCode() {
      return Math.floor(Math.random() * 999999);  // génère un nombre entre 0 et 1000 inclus
    }
  
    // Fonction d'envoi de l'email de réinitialisation de mot de passe
    async sendPasswordResetEmail(to: string, token: string) {
      const resetLink ='http://yourapp.com/reset-password?token=${token}';
      const resetCode = this.generateRandomCode();  // Générez le code aléatoire
  
      const mailOptions = {
        from: 'Auth-backend service',
        to: to,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <p><a href="${resetLink}">Reset Password</a></p>
          <p>Your reset code is: <strong>${resetCode}</strong></p>  <!-- Affiche le code dans l'email -->
        `,
      };
  
      await this.transporter.sendMail(mailOptions);
    }
  }
