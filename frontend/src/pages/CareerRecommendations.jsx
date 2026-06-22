import React, { useEffect, useState } from "react";

function Spinner({ size = 6 }) {
  return (
    <svg
      className={`animate-spin h-${size} w-${size} text-gray-600`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
}

export default function CareerRecommendations() {
  const [loading, setLoading] = useState(true);
  const [studentSkills, setStudentSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [allCareers, setAllCareers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeCareer, setActiveCareer] = useState(null);
  const [question, setQuestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // fetch recommendations and all careers in parallel
    Promise.all([
      fetch("/api/career/recommendations", { headers }).then((r) => r.json()),
      fetch("/api/career/all").then((r) => r.json()),
    ])
      .then(([recRes, allRes]) => {
        if (recRes && recRes.success) {
          setStudentSkills(recRes.studentSkills || []);
          setRecommendations(recRes.recommendations || []);
        }
        if (allRes && allRes.success) {
          setAllCareers(allRes.careers || []);
        }
      })
      .catch((err) => console.error("Error fetching career data:", err))
      .finally(() => setLoading(false));
  }, []);

  function percentFromScore(score) {
    return Math.round((Number(score) || 0) * 100);
  }

  function progressColor(score) {
    const p = percentFromScore(score);
    if (p > 70) return "bg-green-500";
    if (p >= 40) return "bg-yellow-400";
    return "bg-red-500";
  }

  function openAskModal(rec) {
    setActiveCareer(rec);
    setQuestion(`How can I become a ${rec.title} based on my current skills?`);
    setAiAnswer(null);
    setModalOpen(true);
  }

  async function submitQuestion() {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAiLoading(true);
    try {
      const resp = await fetch("/api/career/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question }),
      });
      const data = await resp.json();
      setAiAnswer(data.answer || data?.message || JSON.stringify(data));
    } catch (err) {
      setAiAnswer("Error contacting AI service.");
    } finally {
      setAiLoading(false);
    }
  }

  // helper to find career skills from allCareers by title
  function careerSkillsFor(rec) {
    if (!allCareers || !rec) return [];
    const found = allCareers.find((c) => (c.title || "").toLowerCase() === (rec.title || "").toLowerCase());
    return found?.skills || [];
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size={8} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Career Recommendations</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Detected Skills</h3>
        <div className="flex flex-wrap gap-2">
          {studentSkills.length === 0 && <span className="text-sm text-gray-500">No skills detected</span>}
          {studentSkills.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => {
          const percent = percentFromScore(rec.score);
          const careerSkills = careerSkillsFor(rec);
          const haveSkills = careerSkills.filter((sk) => studentSkills.map((x) => x.toLowerCase()).includes(String(sk).toLowerCase()));
          const missing = rec.skillGap || [];
          return (
            <div key={rec.title} className="bg-white shadow rounded-md p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{rec.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rec.level === 'entry' ? 'bg-blue-100 text-blue-800' : rec.level==='mid' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                      {rec.level}
                    </span>
                    <span className="text-sm text-gray-600">{rec.salaryRange}</span>
                  </div>
                </div>
                <div className="w-24 text-right text-sm">
                  <div className="text-xs text-gray-500">Match</div>
                  <div className="text-lg font-semibold">{percent}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                  <div className={`${progressColor(rec.score)} h-2`} style={{ width: `${percent}%` }} />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold mb-2">Skills you have</div>
                <div className="flex flex-wrap gap-2">
                  {haveSkills.length === 0 && <span className="text-sm text-gray-500">No matching skills detected</span>}
                  {haveSkills.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-full bg-green-50 text-green-800 text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold mb-2">Skills to learn</div>
                <div className="flex flex-wrap gap-2">
                  {missing.length === 0 && <span className="text-sm text-gray-500">No additional skills needed</span>}
                  {missing.map((s) => (
                    <span key={s} className="px-2 py-1 rounded-full bg-red-50 text-red-800 text-sm flex items-center gap-2">
                      <span>{s}</span>
                      <span className="text-xs bg-red-100 text-red-700 px-1 rounded">Learn</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold mb-2">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {rec.certifications && rec.certifications.length > 0 ? rec.certifications.map((c) => (
                    <span key={c} className="px-2 py-1 rounded bg-gray-100 text-gray-800 text-sm">{c}</span>
                  )) : <span className="text-sm text-gray-500">None listed</span>}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold mb-2">Job roles</div>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {rec.jobRoles && rec.jobRoles.length > 0 ? rec.jobRoles.map((r) => <li key={r}>{r}</li>) : <li>—</li>}
                </ul>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => openAskModal(rec)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Ask AI About This Career
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && activeCareer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-md shadow p-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold">Ask AI about {activeCareer.title}</h4>
              <button onClick={() => setModalOpen(false)} className="text-gray-600">Close</button>
            </div>

            <div className="mt-4">
              <textarea className="w-full border rounded p-3" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>

            <div className="mt-4 flex gap-3 items-center">
              <button
                onClick={submitQuestion}
                disabled={aiLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {aiLoading ? (
                  <span className="inline-flex items-center gap-2"><Spinner size={5} /> Asking...</span>
                ) : (
                  "Ask"
                )}
              </button>
              <button onClick={() => { setModalOpen(false); setAiAnswer(null); }} className="px-3 py-2 bg-gray-100 rounded">Close</button>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">AI Response</div>
              <div className="min-h-[80px] p-3 bg-gray-50 rounded">
                {aiLoading && <div className="flex items-center gap-2"><Spinner size={5} /> Thinking...</div>}
                {!aiLoading && aiAnswer && <div className="whitespace-pre-wrap">{aiAnswer}</div>}
                {!aiLoading && !aiAnswer && <div className="text-sm text-gray-500">No answer yet.</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
