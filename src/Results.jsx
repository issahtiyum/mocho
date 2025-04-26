export default function Results({ results }) {
  let confidenceColor;
  if (results.confidence >= 0.8) confidenceColor = "green";
  else if (results.confidence >= 0.7) confidenceColor = "yellow";
  else if (results.confidence >= 0.6) confidenceColor = "orange";
  else confidenceColor = "red";

  return (
    <div className="results-container">
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
          <span>{results.estimatedCaloriesInKcal}</span>
        </div>
        <div className="result-item estimated-mass">
          <div>
            <span>Mass</span>
            <span>⚖️</span>
          </div>
          <span>{results.estimatedMassInGrams}</span>
        </div>
        <div className="result-item oil-content">
          <div>
            <span>Oil Content</span>
            <span>🍳</span>
          </div>
          <span>{results.oilContent}</span>
        </div>
        <div className="result-item health-rating">
          <div>
            <span>Health Rating</span>
            <span>👍</span>
          </div>
          <span>{results.healthRating} / 10</span>
        </div>
        {/* <div className="result-item health-rating">
      Health Rating: {results.healthRating}
    </div> */}
      </div>
      <div className="result-item interesting-fact">
        💡 {results.interestingFact}
      </div>
    </div>
  );
}
