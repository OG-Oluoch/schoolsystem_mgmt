// ── Service ──────────────────────────────────────────────────────────────────
import { httpClient } from "@/api/client"

const SUBJECTS  = ["Mathematics","English","Biology","Chemistry","Physics","History","Computer Science","Art & Design"]
const TEACHERS  = ["Dr. A. Smith","Ms. E. Johnson","Mr. R. Davis","Prof. C. Wilson","Ms. L. Brown","Dr. K. Lee","Mr. J. Garcia","Ms. P. Taylor"]
const GRADES    = ["Grade 9","Grade 10","Grade 11","Grade 12"]
const STATUSES  = ["upcoming","ongoing","completed","completed","upcoming","completed","ongoing","upcoming"]

export const examsService = {
  getAll: async () => {
    const posts = await httpClient.get("/posts?_limit=8")
    return posts.map((p, i) => ({
      id: p.id,
      examId:    `EXM-${300 + p.id}`,
      title:     SUBJECTS[i % SUBJECTS.length] + " Mid-Term Exam",
      subject:   SUBJECTS[i % SUBJECTS.length],
      teacher:   TEACHERS[i % TEACHERS.length],
      grade:     GRADES[i % GRADES.length],
      date:      `2025-0${(i % 9) + 1}-${String(10 + i * 2).padStart(2, "0")}`,
      duration:  [60, 90, 120][i % 3],
      totalMarks: [50, 75, 100][i % 3],
      passMark:   [25, 40, 50][i % 3],
      status:    STATUSES[i % STATUSES.length],
      room:      `Room ${100 + i * 3}`,
    }))
  },
}