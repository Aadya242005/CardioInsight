import React, { useState } from 'react'

const sampleROC = {
  fpr: [0, 0.1, 0.2, 0.4, 1],
  tpr: [0, 0.6, 0.75, 0.85, 1],
  auc: 0.87
}

const sampleFI = [
  { name: 'Age', value: 0.22 },
  { name: 'Ejection Fraction', value: 0.18 },
  { name: 'Serum Creatinine', value: 0.16 },
  { name: 'Platelets', value: 0.12 },
  { name: 'Serum Sodium', value: 0.08 }
]

const LineSVG = ({ fpr, tpr }) => {
  // simple SVG polyline mapping
  const w = 600, h = 300, pad = 30
  const points = fpr.map((x, i) => {
    const px = pad + x * (w - pad * 2)
    const py = h - (pad + tpr[i] * (h - pad * 2))
    return `${px},${py}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-64 bg-white">
      <rect x="0" y="0" width={w} height={h} fill="#fff" />
      <polyline points={points} stroke="#2563eb" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1={pad} y1={h-pad} x2={w-pad} y2={h-pad} stroke="#ddd" />
      <line x1={pad} y1={pad} x2={pad} y2={h-pad} stroke="#ddd" />
    </svg>
  )
}

const BarList = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.name} className="flex items-center gap-4">
          <div className="w-40 text-sm text-gray-700">{it.name}</div>
          <div className="flex-1 bg-gray-100 rounded overflow-hidden h-4">
            <div style={{ width: `${Math.round(it.value*100)}%` }} className="h-4 bg-indigo-600" />
          </div>
          <div className="w-12 text-right text-sm text-gray-600">{Math.round(it.value*100)}%</div>
        </div>
      ))}
    </div>
  )
}

const InteractiveCharts = () => {
  const [view, setView] = useState('roc')

  return (
    <section className="mt-6">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">Interactive Charts</h3>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setView('roc')} className={`px-3 py-1 rounded ${view==='roc' ? 'bg-indigo-600 text-white':''}`}>ROC</button>
          <button onClick={() => setView('fi')} className={`px-3 py-1 rounded ${view==='fi' ? 'bg-indigo-600 text-white':''}`}>Feature Importance</button>
        </div>
      </div>

      {view === 'roc' ? (
        <div>
          <div className="text-sm text-gray-600 mb-2">AUC: {sampleROC.auc}</div>
          <LineSVG fpr={sampleROC.fpr} tpr={sampleROC.tpr} />
        </div>
      ) : (
        <div>
          <BarList items={sampleFI} />
        </div>
      )}
    </section>
  )
}

export default InteractiveCharts
