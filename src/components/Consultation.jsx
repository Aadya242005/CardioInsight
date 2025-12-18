import React, { useState } from "react";
import heroImg from "../assets/heart.jpg";

const Consultation = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    symptoms: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (k, v) => setForm({ ...form, [k]: v });

  const submit = (e) => {
    e.preventDefault();
    console.log("consult request", form);
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section
      id="consult"
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-start text-white">
          
          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-bold mb-3">Consult a Clinician</h2>
            <p className="text-gray-200 mb-6">
              If you're concerned about a patient's heart failure risk or need
              clinical advice, submit a brief summary. This is for informational
              purposes only — not an emergency service.
            </p>

            <div className="bg-white text-gray-800 border rounded-lg p-6 shadow-lg">
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex flex-col">
                    <span className="text-sm">Full name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      className="mt-1 p-2 border rounded"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm">Age</span>
                    <input
                      type="number"
                      required
                      value={form.age}
                      onChange={(e) => onChange("age", e.target.value)}
                      className="mt-1 p-2 border rounded"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm">Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => onChange("email", e.target.value)}
                      className="mt-1 p-2 border rounded"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm">Phone (optional)</span>
                    <input
                      value={form.phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                      className="mt-1 p-2 border rounded"
                    />
                  </label>
                </div>

                <label className="flex flex-col mt-3">
                  <span className="text-sm">Brief summary / symptoms</span>
                  <textarea
                    required
                    rows={5}
                    value={form.symptoms}
                    onChange={(e) => onChange("symptoms", e.target.value)}
                    className="mt-1 p-2 border rounded"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Request Consultation
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        name: "",
                        age: "",
                        email: "",
                        phone: "",
                        symptoms: "",
                      })
                    }
                    className="bg-gray-200 px-3 py-2 rounded"
                  >
                    Clear
                  </button>

                  {sent && (
                    <span className="text-green-600 text-sm">
                      Request submitted — we’ll follow up by email.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div className="bg-white text-gray-800 border rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">When to consult</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>New or worsening shortness of breath</li>
                <li>Marked fatigue or reduced exercise tolerance</li>
                <li>Rapid weight gain, swelling, or fainting</li>
                <li>Medication or follow-up questions</li>
              </ul>
            </div>

            <div className="bg-white text-gray-800 border rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">
                Resources & Next Steps
              </h3>
              <p className="text-sm mb-3">
                Review heart failure risk factors and analytics before
                consulting.
              </p>

              <a
                href="#analysis"
                className="inline-block bg-indigo-100 text-indigo-700 px-3 py-2 rounded"
              >
                View Analysis
              </a>

              <a
                href="/insight_report.html"
                target="_blank"
                rel="noreferrer"
                className="inline-block ml-3 bg-gray-100 px-3 py-2 rounded"
              >
                Open Report
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Consultation;
