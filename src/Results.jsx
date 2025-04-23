export default function Results({ results }) {
  return (
    <div className="results-container">
      <h2 className="result-item description">{results.description}</h2>
      <div className="figures">
        <div className="result-item estimated-calories">
          <div>
            <span>Calories</span>
            <span>🔥</span>
          </div>
          <span>{results.estimatedCalories}</span>
        </div>
        <div className="result-item estimated-mass">
          <div>
            <span>Mass</span>
            <span>⚖️</span>
          </div>
          <span>{results.estimatedMass}</span>
        </div>
        <div className="result-item oil-content">
          <div>
            <span>Oil Content</span>
            <span>🍳</span>
          </div>
          <span>{results.oilContent}</span>
        </div>
        <div className="result-item confidence">
          <div>
            <span>Accuracy</span>
            <span>💪</span>
          </div>
          <span>{results.confidence * 100}%</span>
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
