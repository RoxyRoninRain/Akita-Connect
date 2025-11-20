import { GoogleGenAI } from "@google/genai";

const getAI = () => {
    // Create React App requires env variables to start with REACT_APP_
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

export const askAkitaExpert = async (query: string, history: string[] = []): Promise<string> => {
  const ai = getAI();
  if (!ai) return "AI Service Unavailable: Missing API Key.";

  try {
    const model = "gemini-2.5-flash";
    const historyText = history.join("\n");
    const systemInstruction = "You are an expert Akita dog breeder and judge. You are knowledgeable about Japanese Akitas (Akita Inu) and American Akitas. You understand pedigrees, genetics, health issues (like SA, VKH), and show standards. Be helpful, concise, and professional.";
    
    const response = await ai.models.generateContent({
      model,
      contents: `Previous conversation:\n${historyText}\n\nUser Query: ${query}`,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error consulting the Akita database.";
  }
};

export const generatePedigreeAnalysis = async (akitaName: string, sireName: string, damName: string): Promise<string> => {
    const ai = getAI();
    if (!ai) return "AI Service Unavailable.";

    try {
         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the potential pedigree combination of Sire: ${sireName} and Dam: ${damName} for a puppy named ${akitaName}. 
            Discuss potential traits based on general Akita genetics (coat types, temperament). This is a simulated analysis for a demo app.`,
         });
         return response.text || "Analysis failed.";
    } catch (e) {
        return "Could not perform analysis.";
    }
}

export const generateAkitaBio = async (name: string, traits: string): Promise<string> => {
  const ai = getAI();
  if (!ai) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging social media bio (under 300 characters) for an Akita dog named ${name}. Traits: ${traits}.`,
    });
    return response.text || "";
  } catch (e) {
    return "";
  }
}

export const generateLitterImage = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  if (!ai) return null;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9', 
      },
    });
    
    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (base64ImageBytes) {
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (e) {
    console.error("Image generation failed", e);
    return null;
  }
}

export const parsePedigreeImage = async (base64Image: string): Promise<any> => {
    const ai = getAI();
    if (!ai) return null;

    try {
        // Strip data URL prefix if present
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: cleanBase64
                        }
                    },
                    {
                        text: `Analyze this pedigree document. Extract the names of the Sire (Father) and Dam (Mother), and if visible, the Grandparents.
                        Return ONLY a valid JSON object with this structure:
                        {
                          "sire": { "name": "Name", "regNum": "Optional Reg#" },
                          "dam": { "name": "Name", "regNum": "Optional Reg#" },
                          "paternalGrandSire": { "name": "Name" },
                          "paternalGrandDam": { "name": "Name" },
                          "maternalGrandSire": { "name": "Name" },
                          "maternalGrandDam": { "name": "Name" }
                        }
                        If a field is missing/unreadable, use null.`
                    }
                ]
            }
        });
        
        const text = response.text || "{}";
        // Attempt to clean markdown code blocks if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Pedigree extraction failed", e);
        return null;
    }
}