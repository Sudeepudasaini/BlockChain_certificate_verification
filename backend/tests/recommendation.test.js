const {
  cosineSimilarity,
  buildVectors,
  calculateMatchScore,
  getSkillGap,
  generateRecommendations,
} = require("../services/recommendation");

describe("Recommendation service", () => {
  describe("cosineSimilarity", () => {
    test("identical vectors -> 1.0", () => {
      const a = [1, 0, 1, 1];
      const b = [1, 0, 1, 1];
      const s = cosineSimilarity(a, b);
      expect(s).toBeCloseTo(1.0, 6);
    });

    test("completely different vectors -> 0.0", () => {
      const a = [1, 0, 0];
      const b = [0, 1, 0];
      const s = cosineSimilarity(a, b);
      expect(s).toBeCloseTo(0.0, 6);
    });

    test("partial match -> between 0 and 1", () => {
      const a = [1, 1, 0];
      const b = [1, 0, 1];
      const s = cosineSimilarity(a, b);
      expect(s).toBeGreaterThan(0);
      expect(s).toBeLessThan(1);
      // known value 0.5
      expect(s).toBeCloseTo(0.5, 6);
    });
  });

  describe("getSkillGap", () => {
    test("returns only missing skills (case-insensitive)", () => {
      const student = ["JavaScript", "React"];
      const career = ["react", "node.js", "TypeScript"];
      const gap = getSkillGap(student, career);
      // should include node.js and TypeScript but not react
      expect(gap).toContain("node.js");
      expect(gap).toContain("TypeScript");
      expect(gap).not.toContain("react");
      expect(gap.length).toBe(2);
    });
  });

  describe("generateRecommendations", () => {
    const mockCareers = [
      { title: "A", skills: ["js", "react"] },
      { title: "B", skills: ["python", "pandas"] },
      { title: "C", skills: ["js"] },
      { title: "D", skills: ["go"] },
      { title: "E", skills: ["rust"] },
      { title: "F", skills: ["java"] },
    ];

    test("returns max 5 results and sorted by score desc", () => {
      const student = ["js", "react"];
      const recs = generateRecommendations(student, mockCareers);
      expect(recs.length).toBeLessThanOrEqual(5);
      // scores should be in descending order
      for (let i = 1; i < recs.length; i++) {
        expect(recs[i - 1].score).toBeGreaterThanOrEqual(recs[i].score);
      }
      // each result has required fields
      recs.forEach((r) => {
        expect(r).toHaveProperty("title");
        expect(r).toHaveProperty("score");
        expect(r).toHaveProperty("skillGap");
      });
    });

    test("returns fewer than 5 when careers less than 5", () => {
      const small = mockCareers.slice(0, 3);
      const recs = generateRecommendations(["python"], small);
      expect(recs.length).toBeLessThanOrEqual(3);
    });
  });
});
