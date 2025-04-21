import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBqImbKHd3Vnu9NUGNNHLIkIJgQ2bIMMGA",
});

export default async function calculateCalories(uploadedImage) {
  const image = await ai.files.upload({
    file: uploadedImage,
    // config: { mimeType: "image/webp" },
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      createUserContent([
        "Analyze this image and estimate the number of calories in the meal shown. Assume it is a typical Ghanaian dish and try to identify all visible food items (e.g., jollof rice, banku, waakye, fufu, etc.). Consider common portion sizes as served in Ghanaian homes or local food joints ('chop bars').If the image quality is poor (blurry, low light), make your best educated guess based on color, texture, shape, and visible features. Use one-shot or few-shot estimation if you've seen similar meals before. When uncertain, provide calorie estimates with confidence ranges and mention possible ingredients. Also, describe the likely cooking method (e.g., deep-fried, boiled, grilled) and how it might affect the calorie count.Respond in clear, simple language that a Ghanaian user can easily understand.",
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
  });
  console.log(response.text);
}
