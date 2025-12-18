import React, { useState } from 'react'

const sigmoid = (x) => 1 / (1 + Math.exp(-x))

// Demo coefficients - replaceable by model coefficients
const COEFFS = {
  intercept: -3.2,
  age: 0.02,
  ejection_fraction: -0.03,
  serum_creatinine: 0.9,
  platelets: -0.00001,
  serum_sodium: -0.03
}

const RiskCalculator = () => {
  const [form, setForm] = useState({
    age: 60,
    ejection_fraction: 30,
    serum_creatinine: 1.1,
    platelets: 250000,
    serum_sodium: 137
  })
  const [score, setScore] = useState(null)

  const onChange = (k, v) => setForm({...form, [k]: Number(v)})

  const compute = (e) => {
    e && e.preventDefault()
    const s = COEFFS.intercept +
      COEFFS.age * form.age +
      COEFFS.ejection_fraction * form.ejection_fraction +
      COEFFS.serum_creatinine * form.serum_creatinine +
      COEFFS.platelets * form.platelets +
      COEFFS.serum_sodium * form.serum_sodium
    const p = sigmoid(s)
    setScore((p*100).toFixed(1))
  }

  return (
    <section className="mt-6 bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3">Single-patient Risk Calculator (Demo)</h3>
      <form onSubmit={compute} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-gray-700">Age</span>
          <input type="number" value={form.age} onChange={(e)=>onChange('age', e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-700">Ejection Fraction</span>
          <input type="number" value={form.ejection_fraction} onChange={(e)=>onChange('ejection_fraction', e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-700">Serum Creatinine</span>
          <input type="number" step="0.01" value={form.serum_creatinine} onChange={(e)=>onChange('serum_creatinine', e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-700">Platelets</span>
          <input type="number" value={form.platelets} onChange={(e)=>onChange('platelets', e.target.value)} className="mt-1 p-2 border rounded" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-700">Serum Sodium</span>
          <input type="number" value={form.serum_sodium} onChange={(e)=>onChange('serum_sodium', e.target.value)} className="mt-1 p-2 border rounded" />
        </label>

        <div className="flex items-end gap-3">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Compute Risk</button>
          <button type="button" onClick={()=>{setForm({age:60,ejection_fraction:30,serum_creatinine:1.1,platelets:250000,serum_sodium:137}); setScore(null)}} className="bg-gray-100 px-4 py-2 rounded">Reset</button>
        </div>
      </form>

      {score !== null && (
        <div className="mt-4 p-3 bg-white border rounded text-center">
          <div className="text-sm text-gray-600">Estimated 1-year risk</div>
          <div className="text-2xl font-semibold text-red-600">{score}%</div>
          <div className="text-sm text-gray-600 mt-2">This is a demo score for UI purposes only. Replace with model inference for real predictions.</div>
        </div>
      )}
    </section>
  )
}

export default RiskCalculator
