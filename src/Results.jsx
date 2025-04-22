export default function Results({ results }) {
  return (
    <div className="results-container">
      <div className="result-item">{results.description}</div>
      <div className="result-item">
        Estimated Calories: {results.estimatedCalories}
      </div>
      <div className="result-item">Estimated Mass: {results.estimatedMass}</div>
      <div className="result-item">Oil Content: {results.oilContent}</div>
      <div className="result-item">Confidence: {results.confidence}</div>
      <div className="result-item">Health Rating: {results.healthRating}</div>
      <div className="result-item">
        Interesting Fact: {results.interestingFact}
      </div>
    </div>
  );
}
