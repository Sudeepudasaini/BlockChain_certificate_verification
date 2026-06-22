/**
 * Hybrid Career Recommendation Engine
 * Exports: cosineSimilarity, buildVectors, calculateMatchScore,
 *          getSkillGap, generateRecommendations
 */

function cosineSimilarity(studentVector, careerVector) {
  if (!Array.isArray(studentVector) || !Array.isArray(careerVector)) return 0;
  const len = Math.min(studentVector.length, careerVector.length);
  let dot = 0;
  let sumA = 0;
  let sumB = 0;
  for (let i = 0; i < len; i++) {
    const a = Number(studentVector[i]) || 0;
    const b = Number(careerVector[i]) || 0;
    dot += a * b;
    sumA += a * a;
    sumB += b * b;
  }
  const magA = Math.sqrt(sumA);
  const magB = Math.sqrt(sumB);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

function buildVectors(studentSkills, careerSkills) {
  const s = Array.isArray(studentSkills) ? studentSkills.map((x) => String(x).toLowerCase().trim()) : [];
  const c = Array.isArray(careerSkills) ? careerSkills.map((x) => String(x).toLowerCase().trim()) : [];
  const vocabSet = new Set([...s, ...c]);
  const vocab = Array.from(vocabSet).sort();
  const studentVector = vocab.map((w) => (s.includes(w) ? 1 : 0));
  const careerVector = vocab.map((w) => (c.includes(w) ? 1 : 0));
  return { studentVector, careerVector };
}

function calculateMatchScore(studentSkills, careerSkills) {
  const { studentVector, careerVector } = buildVectors(studentSkills, careerSkills);
  const score = cosineSimilarity(studentVector, careerVector);
  return Number(score.toFixed(2));
}

function getSkillGap(studentSkills, careerSkills) {
  const s = Array.isArray(studentSkills) ? studentSkills.map((x) => String(x).toLowerCase().trim()) : [];
  if (!Array.isArray(careerSkills)) return [];
  const sSet = new Set(s);
  const gap = [];
  for (const skill of careerSkills) {
    const norm = String(skill).toLowerCase().trim();
    if (!sSet.has(norm)) gap.push(skill);
  }
  return gap;
}

function generateRecommendations(studentSkills, allCareers) {
  const careers = Array.isArray(allCareers) ? allCareers : [];
  const results = careers.map((career) => {
    const careerSkills = Array.isArray(career.skills) ? career.skills : [];
    const score = calculateMatchScore(studentSkills, careerSkills);
    const skillGap = getSkillGap(studentSkills, careerSkills);
    return {
      title: career.title || career.name || "",
      score,
      skillGap,
      level: career.level || null,
      description: career.description || "",
      certifications: Array.isArray(career.certifications) ? career.certifications : [],
      jobRoles: Array.isArray(career.jobRoles) ? career.jobRoles : [],
      salaryRange: career.salaryRange || "",
    };
  });
  results.sort((a, b) => b.score - a.score || (a.title || "").localeCompare(b.title || ""));
  return results.slice(0, 5);
}

module.exports = {
  cosineSimilarity,
  buildVectors,
  calculateMatchScore,
  getSkillGap,
  generateRecommendations,
};
