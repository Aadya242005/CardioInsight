import React, { useEffect, useState } from 'react'
import Metrics from './Metrics'

const ConfusionMatrix = ({matrix}) => {
  if (!matrix) return null
  const [[tn, fp], [fn, tp]] = matrix
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm w-full max-w-md">
      <div className="text-sm text-gray-500 mb-2">Confusion Matrix</div>
      <table className="w-full text-center table-auto">
        <thead>
          <tr>
            <th></th>
            <th className="px-4 py-2">Predicted 0</th>
            <th className="px-4 py-2">Predicted 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left px-4 py-2">Actual 0</td>
            <td className="px-4 py-2">{tn}</td>
            <td className="px-4 py-2">{fp}</td>
          </tr>
          <tr>
            <td className="text-left px-4 py-2">Actual 1</td>
            <td className="px-4 py-2">{fn}</td>
            <td className="px-4 py-2">{tp}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Recommendation = ({title, children}) => (
  <div className="bg-white border rounded-lg p-4 shadow-sm">
    <h4 className="font-semibold mb-2">{title}</h4>
    <div className="text-sm text-gray-700">{children}</div>
  </div>
)

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetch('/analysis/metrics.json')
      .then(r => r.json())
      .then(d => setMetrics(d))
      .catch(() => setMetrics(null))
  }, [])

  return (
    <section id="dashboard" className="pt-24 px-6 pb-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Clinical Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of model performance, feature importance and recommendations for clinical use.</p>
          </div>
        </div>

        <Metrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">Key Charts</h3>
                <div className="text-sm text-gray-500">Interactive versions available in Visuals</div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded overflow-hidden border">
                  <img src="/assets/images/summary_chart.svg" alt="Summary" className="w-full h-56 object-cover" />
                </div>
                <div className="rounded overflow-hidden border flex flex-col">
                  <img src="/assets/images/roc_curve.svg" alt="ROC" className="w-full h-56 object-contain" />
                  <div className="p-3 border-t text-sm text-gray-600">ROC curve (placeholder) — replace with analysis output for final report.</div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Confusion Matrix & Threshold Tuning</h3>
              <div className="flex gap-6 items-start flex-col md:flex-row">
                <ConfusionMatrix matrix={metrics?.confusion_matrix} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Use the threshold tuner to adjust the tradeoff between sensitivity and specificity. The interface will update precision/recall and the confusion matrix in real-time (client-side implementation can be added).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Recommendation title="Immediate Actions">
              - Prioritize high-risk patients for follow-up within 48 hours.<br />
              - Review renal function (serum creatinine) and adjust medication accordingly.<br />
              - Consider cardiology referral for patients with low ejection fraction.
            </Recommendation>

            <Recommendation title="Data / Deployment Notes">
              - Validate the model on local patient population before clinical use.<br />
              - Monitor model drift and re-train periodically with new labels.<br />
              - Ensure explainability (SHAP) and clinician sign-off for high-risk alerts.
            </Recommendation>

            <Recommendation title="UI / UX Suggestions">
              - Add interactive ROC and PR charts with hover and zoom.<br />
              - Implement a Single-Patient risk calculator for bedside use.<br />
              - Exportable PDF reports for clinician sign-off and record keeping.
            </Recommendation>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
