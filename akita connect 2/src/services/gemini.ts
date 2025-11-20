import { GoogleGenAI } from "@google/genai";

const getAI = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

export const askAkitaExpert = async (query: string, history: string[] = []): Promise<string> => {
  const ai = getAI();
  if (!ai) return "AI Service Unavailable: Missing API Key.";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Previous conversation:\n${history.join("\n")}\n\nUser Query: ${query}`,
      config: { systemInstruction: "You are an expert Akita dog breeder and judge..." }
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) { return "Sorry, I encountered an error."; }
};

export const generateAkitaBio = async (name: string, traits: string): Promise<string> => {
  const ai = getAI();
  if (!ai) return "";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short bio for an Akita named ${name}. Traits: ${traits}.`,
    });
    return response.text || "";
  } catch (e) { return ""; }
}

export const generateLitterImage = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  if (!ai) return null;
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '16:9' },
    });
    return response.generatedImages?.[0]?.image?.imageBytes ? `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}` : null;
  } catch (e) { return null; }
}

export const parsePedigreeImage = async (base64Image: string): Promise<any> => {
    const ai = getAI();
    if (!ai) return null;
    try {
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ inlineData: { mimeType: 'image/jpeg', data: cleanBase64 }}, { text: "Extract Sire/Dam JSON..." }] }
        });
        const text = response.text || "{}";
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (e) { return null; }
};