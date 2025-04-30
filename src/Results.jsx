import { Analytics } from "@vercel/analytics/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Results({ results }) {
  let confidenceColor;
  if (results.confidence >= 0.8) confidenceColor = "green";
  else if (results.confidence >= 0.7) confidenceColor = "yellow";
  else if (results.confidence >= 0.6) confidenceColor = "orange";
  else confidenceColor = "red";

  let calorieColor;
  let calorieMessage;
  if (results.estimatedCaloriesInKcal >= 1000) {
    calorieColor = "red";
    calorieMessage =
      "This meal is high in calories, meaning it gives a lot of energy. Eat less if you're not very active today.";
  } else if (results.estimatedCaloriesInKcal >= 700) {
    calorieColor = "yellow";
    calorieMessage =
      "This meal has a moderate amount of calories. It's a balanced option for most activities.";
  } else {
    calorieColor = "green";
    calorieMessage =
      "This meal is low in calories, making it a lighter option. Good for light meals or snacks.";
  }

  return (
    <div className="results-container">
      <Analytics />
      <h2 className="result-item description">
        {results.description}
        <span className={"confidence-level " + confidenceColor}>
          {results.confidence * 100}% Certainty
        </span>
      </h2>
      <div className="figures">
        <div className="result-item estimated-calories">
          <div>
            <span>Calories</span>
            <span>🔥</span>
          </div>
          <div>
            <span className={"result " + calorieColor}>
              {results.estimatedCaloriesInKcal}kcal
            </span>
            <div className="calorie-info">
              <AiOutlineInfoCircle />
              <span className={"message " + calorieColor}>
                {calorieMessage}
              </span>
            </div>
          </div>
        </div>
        <div className="result-item estimated-mass">
          <div>
            <span>Mass</span>
            <span>⚖️</span>
          </div>
          <span className="result">{results.estimatedMassInGrams}g</span>
        </div>
        <div className="result-item oil-content">
          <div>
            <span>Oil Content</span>
            <span>🍳</span>
          </div>
          <span className="result">{results.oilContent}</span>
        </div>
        <div className="result-item health-rating">
          <div>
            <span>Health Rating</span>
            <span>👍</span>
          </div>
          <span className="result">{results.healthRating} / 10</span>
        </div>
      </div>
      <div className="result-item interesting-fact">
        💡 {results.interestingFact}
      </div>
    </div>
  );
}
