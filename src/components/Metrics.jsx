import React, { useEffect, useState } from 'react'

const MetricCard = ({label, value}) => (
  <div className="bg-white border rounded-lg p-4 shadow-sm flex-1">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold mt-2">{typeof value === 'number' ? value.toFixed(2) : value}</div>
  </div>
)

const Metrics = () => {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetch('/analysis/metrics.json')
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(() => setMetrics(null))
  }, [])

  if (!metrics) return (
    <div className="py-6">Loading metrics...</div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <MetricCard label="Model" value={metrics.model} />
      <MetricCard label="Precision" value={metrics.precision} />
      <MetricCard label="Recall" value={metrics.recall} />
      <MetricCard label="F1-score" value={metrics.f1_score} />
      <div className="sm:col-span-4 bg-white border rounded-lg p-4">
        <div className="text-sm text-gray-500">ROC-AUC</div>
        <div className="text-xl font-semibold mt-2">{metrics.roc_auc.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Metrics
