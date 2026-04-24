import { httpClient } from "@/api/client"

const SUBJECTS     = ["Mathematics", "English Literature", "Biology", "Chemistry", "Physics", "History", "Art & Design", "Computer Science", "Music", "Physical Education"]
const DEPARTMENTS  = ["STEM", "Humanities", "STEM", "STEM", "STEM", "Humanities", "Arts", "STEM", "Arts", "Sports"]

export const teachersService = {
  getAll: async () => {
    const users = await httpClient.get("/users")
    return users.slice(0, 6).map((u, i) => ({
      id: u.id + 100,
      staffId: `TCH-${200 + u.id}`,
      name: u.name,
      email: u.email,
      phone: u.phone,
      subject: SUBJECTS[i % SUBJECTS.length],
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      studentsCount: 18 + (u.id % 12),
      yearsExp: 2 + (u.id % 15),
      status: "active",
      avatar: u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    }))
  },
}