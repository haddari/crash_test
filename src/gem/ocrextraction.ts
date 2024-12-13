/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class OCRServiceextraction {
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
