import { httpClient } from "@/api/client"

const SUBJECTS = ["Mathematics", "English", "Science", "History", "CS"]

export const performanceService = {
  getAll: async () => {
    const users = await httpClient.get("/users")
    return users.map((u) => {
      const subjectGrades = SUBJECTS.map((s, j) => {
        const score = 45 + ((u.id * (j + 3)) % 55)
        const letter = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : "D"
        return { subject: s, score, letter }
      })
      const avg = subjectGrades.reduce((a, g) => a + g.score, 0) / subjectGrades.length
      const gpa = parseFloat(((avg / 100) * 4).toFixed(2))
      return {
        id: u.id,
        studentId: `STU-${1000 + u.id}`,
        student: u.name,
        avatar: u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        grades: subjectGrades,
        gpa,
        term: "Spring 2025",
      }
    })
  },
}