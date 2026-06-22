import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SkillGapChart({ studentSkills = [], careerSkills = [], careerTitle = "Career" }) {
  const normalize = (arr) => (Array.isArray(arr) ? arr.map((s) => String(s).toLowerCase().trim()) : []);
  const sNorm = normalize(studentSkills);
  const cNorm = normalize(careerSkills);

  // build union preserving careerSkills order first
  const unionSet = new Set();
  careerSkills.forEach((s) => unionSet.add(s));
  studentSkills.forEach((s) => unionSet.add(s));
  const union = Array.from(unionSet);

  const sLowerSet = new Set(sNorm);
  const cLowerSet = new Set(cNorm);

  const data = union.map((skill) => {
    const key = String(skill);
    const lower = key.toLowerCase().trim();
    return {
      skill: key,
      Student: sLowerSet.has(lower) ? 1 : 0,
      Career: cLowerSet.has(lower) ? 1 : 0,
    };
  });

  // Skills that are part of career requirements
  const have = (careerSkills || []).filter((sk) => sLowerSet.has(String(sk).toLowerCase().trim()));
  const missing = (careerSkills || []).filter((sk) => !sLowerSet.has(String(sk).toLowerCase().trim()));

  const CheckIcon = ({ className = "w-4 h-4 text-green-600" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
    </svg>
  );

  const XIcon = ({ className = "w-4 h-4 text-red-600" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">{careerTitle} — Skill Gap Overview</h3>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
            <Radar name="Student" dataKey="Student" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
            <Radar name="Career" dataKey="Career" stroke="#FB923C" fill="#FB923C" fillOpacity={0.4} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-3">Skills You Have</h4>
          {have.length === 0 ? (
            <div className="text-sm text-gray-500">No matching skills detected</div>
          ) : (
            <ul className="space-y-2">
              {have.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:w-1/2 bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-3">Skills to Learn</h4>
          {missing.length === 0 ? (
            <div className="text-sm text-gray-500">You have all required skills</div>
          ) : (
            <ul className="space-y-2">
              {missing.map((s) => (
                <li key={s} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <XIcon />
                    <span className="text-sm">{s}</span>
                  </div>
                  <a
                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    href={`https://www.coursera.org/search?query=${encodeURIComponent(s)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find Course
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
