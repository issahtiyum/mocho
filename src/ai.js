import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default async function calculateCalories(uploadedImage) {
  const image = await ai.files.upload({
    file: uploadedImage,
    // config: { mimeType: "image/webp" },
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `You are a friendly nutritionist who specializes in West African and Ghanaian cuisine, keeping in mind local cooking methods and ingredients. The user has provided an image of a meal. Your task is to analyze the image and estimate:

        1. A concise list of the foods visible in the image, including their approximate quantity (e.g., “2 scoops of rice”, “3 slices of plantain”). Avoid narrative or speculative language.
        2. The estimated total mass of the meal in grams (e.g., "750g").
        3. The oil content of the meal: choose from ["small", "medium", "high", "very high"].
        4. An interesting fact about one of the ingredients that would be relevant or engaging to a Ghanaian audience. If possible, it should be towards the health aspect.
        5. A confidence score (0-1) based on how certain the analysis is.
        6. A number from 0 to 10 showing how healthy the food is, based on portion size, ingredients, and oil content.

        Guidelines:
        - Use visible scale cues — such as spoons, takeaway bowls, hands, or mobile phones — to improve accuracy in portion and mass estimation
        - Consider common portion sizes as served in Ghanaian homes or local food joints ('chop bars').
        - Estimate total calories by considering common calorie values for Ghanaian staples (e.g., 1 scoop of jollof rice ~ 200 kcal, 1 fried plantain slice ~ 50 kcal, 1 tablespoon of oil ~ 120 kcal, etc.).
        - Take into account any hints provided by the user (e.g., number of scoops, number of meat pieces).
        - If multiple foods are on the plate, identify and describe them separately, including their portions.
        - If the image quality is poor, lighting is bad, or the image is blurry, lower your confidence score, and make your best educated guess based on color, texture, shape, and visible features..
        - If oiliness is visible in stews, meat, or around the plate, consider it when assigning oil content.
        - Be culturally aware and use food names and terms common in Ghana (e.g., waakye, kenkey, shito, etc.).
        - If you're uncertain about quantity, estimate conservatively but realistically.
        - If the image is unclear or ambiguous, lower the confidence score and make an informed but conservative estimate.
        - Use Ghanaian standards — what's considered a balanced meal locally?
`,
    },
    contents: [
      createUserContent([
        `
        The user has uploaded an image of a meal.
        Analyse the image and return the result as a JSON object in the following format:
        {
          "description": "...",
          "estimatedMass": "...g",
          "estimatedCalories": "... kcal"
          "oilContent": "small | medium | high | very high",
          "confidence": 0.00,
          "healthRating": 0.00
          "interestingFact": "..."
        }
        The response should begin at the opening curly brace and end at the final curly brace. No additional text should be added.

        Here are a few examples of what the output should look like:

        ---

        Example 1:
        Image Description: A plate with waakye, fried plantain, spaghetti, boiled egg, and wele.
        Response:
        {
          "description": "2 scoops of waakye, 4 slices of fried plantain, a handful of spaghetti, 1 boiled egg, and 3 small pieces of wele.",
          "estimatedMass": "750g",
          "estimatedCalories": "850 kcal",
          "oilContent": "high",
          "confidence": 0.87,
          "healthRating": 5.5,
          "interestingFact": "Wele (cow skin) is a local favorite — it’s low in calories but should be eaten in moderation due to processing methods."
        }

        ---

        Example 2:
        Image Description: A bowl of fufu with light soup and goat meat.
        Response:
        {
          "description": "2 medium balls of fufu with light soup and 4 chunks of goat meat.",
          "estimatedMass": "680g",
          "estimatedCalories": "720 kcal",
          "oilContent": "medium",
          "confidence": 0.9,
          "healthRating": 6.8,
          "interestingFact": "Goat meat is leaner than beef and is a good source of iron, which helps boost energy levels — something every Ghanaian needs!"
        }


        ---

        Example 3:
        Image Description: Banku with okro stew and grilled tilapia.
        Response:
        {
          "description": "2 balls of banku with thick okro stew and 1 medium-sized grilled tilapia.",
          "estimatedMass": "800g",
          "estimatedCalories": "780 kcal",
          "oilContent": "very high",
          "confidence": 0.84,
          "healthRating": 5.0,
          "interestingFact": "Okro is packed with fiber and helps reduce blood sugar — a good reason to keep eating your okro stew!"
        }


        ---

        Example 4:
        Image Description: A plate of jollof rice with chicken and shito.
        Response:
        {
          "description": "2 cups of jollof rice with 1 grilled chicken thigh and a spoonful of shito.",
          "estimatedMass": "650g",
          "estimatedCalories": "820 kcal",
          "oilContent": "high",
          "confidence": 0.88,
          "healthRating": 5.8,
          "interestingFact": "Shito, Ghana's spicy black pepper sauce, can be high in oil, but it's loved for its deep flavor and long shelf life."
        }


        ---

        Example 5:
        Image Description: Kenkey with fried fish and pepper sauce.
        Response:
        {
          "description": "1 large ball of kenkey with 1 fried tilapia and 2 tablespoons of pepper sauce.",
          "estimatedMass": "720g",
          "estimatedCalories": "790 kcal",
          "oilContent": "medium",
          "confidence": 0.85,
          "healthRating": 6.2,
          "interestingFact": "Kenkey, made from fermented maize, helps promote gut health thanks to its probiotic-like fermentation process."
        }


        ---

        Please analyze the image accordingly and provide your structured response.
        As said earlier, the response should begin at the opening curly brace and end at the final curly brace. No additional text should be added.
        `,
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
  });

  const cleanedResponse = response.text.replace(/^```json|```$/g, "").trim();
  console.table(JSON.parse(cleanedResponse));
}
