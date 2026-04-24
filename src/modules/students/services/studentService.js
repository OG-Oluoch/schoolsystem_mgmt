import { httpClient } from "@/api/client"

const GRADES = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]

export const studentsService = {
  getAll: async () => {
    const users = await httpClient.get("/users")
    return users.map((u, i) => ({
      id: u.id,
      studentId: `STU-${1000 + u.id}`,
      name: u.name,
      email: u.email,
      phone: u.phone,
      city: u.address.city,
      grade: GRADES[i % GRADES.length],
      gpa: parseFloat((2.5 + (u.id % 10) * 0.15).toFixed(2)),
      status: u.id % 7 === 0 ? "inactive" : "active",
      enrolledDate: `2024-0${(i % 9) + 1}-${String(10 + i).padStart(2, "0")}`,
      avatar: u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
      guardianName: `Guardian of ${u.name.split(" ")[0]}`,
      guardianPhone: u.phone,
    }))
  },
}