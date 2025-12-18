import React from "react";

const resultsData = [
  { metric: "Accuracy", value: "92%" },
  { metric: "Precision", value: "89%" },
  { metric: "Recall", value: "87%" },
  { metric: "F1-Score", value: "88%" }
];

const Results = () => {
  return (
    <section id="results" className="py-20 bg-white" aria-labelledby="results-heading">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 id="results-heading" className="text-4xl font-bold mb-12">Model Performance Results</h2>
        <div className="grid md:grid-cols-4 gap-8 kpi-grid" role="list" aria-label="Model performance metrics">
          {resultsData.map((item, index) => (
            <div key={index} role="listitem" className="p-6 bg-gray-50 rounded-lg shadow-sm kpi-card" style={{animationDelay: `${index * 80}ms`}}>
              <h3 className="text-2xl font-semibold mb-2 kpi-metric">{item.metric}</h3>
              <p className="kpi-value" aria-live="polite">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
