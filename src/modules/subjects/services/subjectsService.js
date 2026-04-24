import { httpClient } from "@/api/client"

const NAMES    = ["Mathematics","English Literature","Biology","Chemistry","Physics","World History","Computer Science","Art & Design"]
const TEACHERS = ["Dr. A. Smith","Ms. E. Johnson","Mr. R. Davis","Prof. C. Wilson","Ms. L. Brown","Dr. K. Lee","Mr. J. Garcia","Ms. P. Taylor"]
const COLORS   = ["indigo","emerald","amber","rose","violet","sky","orange","teal"]
const GRADES   = ["Grade 9","Grade 10","Grade 11","Grade 12"]

export const subjectsService = {
  getAll: async () => {
    const albums = await httpClient.get("/albums?_limit=8")
    return albums.map((a, i) => ({
      id: a.id,
      code: `C-${100 + i}`,
      name: NAMES[i],
      teacher: TEACHERS[i],
      grade: GRADES[i % GRADES.length],
      students: 18 + (a.id % 12),
      credits: i % 2 === 0 ? 3 : 4,
      schedule: i % 2 === 0 ? "Mon/Wed/Fri" : "Tue/Thu",
      color: COLORS[i],
      description: `Core curriculum course covering essential concepts in ${NAMES[i]}.`,
    }))
  },
}