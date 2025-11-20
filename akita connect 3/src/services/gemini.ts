import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateAIResponse = async (
  messages: ChatMessage[]
): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    const err = error as Error;
    console.error('Error generating AI response:', err);
    throw new Error(`Failed to generate AI response: ${err.message}`);
  }
};

export const generateBreedingAdvice = async (
  damInfo: string,
  sireInfo: string
): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `As a canine genetics expert, provide breeding advice for the following pairing:

Dam Information: ${damInfo}
Sire Information: ${sireInfo}

Please provide:
1. Genetic compatibility assessment
2. Potential health considerations
3. Expected puppy characteristics
4. Breeding recommendations

Keep the response concise and practical.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    const err = error as Error;
    console.error('Error generating breeding advice:', err);
    throw new Error(`Failed to generate breeding advice: ${err.message}`);
  }
};

export const analyzeHealthRecords = async (
  healthData: string
): Promise<string> => {
  try {
    if (!API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const prompt = `As a veterinary AI assistant, analyze the following health records and provide insights:

${healthData}

Please provide:
1. Summary of health status
2. Any concerning patterns or trends
3. Recommended follow-up actions
4. General health advice

Keep the response informative but concise.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    const err = error as Error;
    console.error('Error analyzing health records:', err);
    throw new Error(`Failed to analyze health records: ${err.message}`);
  }
};

export const generateDogImage = async (
  breed: string,
  description: string
): Promise<string> => {
  // Note: Gemini API does not support image generation directly
  // This is a placeholder that returns a message
  // In production, you would integrate with an image generation API like DALL-E or Stable Diffusion
  console.warn('Image generation is not available with Gemini API');
  return `Image generation for ${breed} with description: ${description} is not currently supported. Please use a dedicated image generation service.`;
};
