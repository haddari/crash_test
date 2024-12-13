/*import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GemService {
  private readonly apiKey: string = 'AIzaSyAF8BIDiyO4lsLEVofbfYZkGSyULQjfkfA'; // Remplacez par votre clé API
  private readonly apiUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'; // URL de base de l'API Gemini

  constructor(private readonly httpService: HttpService) {}

  async communicateWithGemini(prompt: string) {
   
    const url = `${this.apiUrl}?key=${this.apiKey}`; // Ajoutez la clé API dans l'URL
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      contents: [
        {
          parts: [
            {
              text: "décris moi l'état générale de la voiture , d'écris les dégats subis , donne aussi une éstimation du prix des pièces a changé  ", // Utilisation du prompt passé en paramètre
            },
          ],
        },
      ],
    };

    try {
      // Envoi de la requête POST avec le corps et les en-têtes
      const response = await lastValueFrom(
        this.httpService.post(url, body, { headers }).pipe(
          catchError((error) => {
            throw new Error(`Gemini API request failed: ${error.response?.data?.error || error.message}`);
          })
        )
      );

      // Traitement de la réponse et retour des données
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error communicating with Gemini API:', error.message);
      throw new Error('Failed to communicate with Gemini API');
    }
  }
}
*/
import { Injectable } from '@nestjs/common';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GemService {
  private fileManager: GoogleAIFileManager;
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.fileManager = new GoogleAIFileManager(process.env.API_KEY);
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY);
  }

  // Extract JSON from string
  extractJson(input: string): object | null {
    try {
      // Find the first '{' and the last '}' in the input
      const startIndex = input.indexOf("{");
      const endIndex = input.lastIndexOf("}");
     
      // If both are found, extract the substring and parse it as JSON
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        const jsonString = input.slice(startIndex, endIndex + 1);
        return JSON.parse(jsonString);
      }
 
      return null; // Return null if no valid JSON structure is found
    } catch (error) {
      console.error("Invalid JSON content:", error);
      return null;
    }
  }

  // Analyze image and extract JSON
  async analyzeImage(mediaPath: string, imageName: string) {
    try {
      // Upload the image
      const uploadResult = await this.fileManager.uploadFile(
        `${mediaPath}/${imageName}`,
        {
          mimeType: "image/jpeg",
          displayName: "Jetpack drawing",
        },
      );

      console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

      // Get the generative model and analyze the image
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        "extract text from image and return a JSON object and provide a title for every document the key title is mantadory you should only retuen json like this {title:ftfty,....}  and try to extract all the keys of document i want many information extracted as a keys in the json or it is confidential document just give a title without analysing anything please and return json like this {title:documenttitle , description:de...}",
        {
          fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType,
          },
        },
      ]);

      // Get the model response
      var model_response = await result.response.text(); // Ensure this is awaited if it's a promise
      console.log("thei si sthe putput odf the primary model response :m:::::::::::")
console.log(model_response)
      // Pass model_response into extractJson
      const extractedJson = this.extractJson(model_response);
      if (!extractedJson) {
        throw new Error("No valid JSON extracted from model response.");
      }

      // Return the extracted JSON
      return extractedJson;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }
}