import { httpClient } from "@/api/client"

const GRADES       = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"]
const RELATIONS    = ["Father", "Mother", "Uncle", "Aunt", "Grandfather", "Grandmother", "Legal Guardian", "Elder Sibling", "Father", "Mother"]
const OCCUPATIONS  = ["Engineer", "Teacher", "Doctor", "Accountant", "Lawyer", "Business Owner", "Nurse", "Architect", "Journalist", "Civil Servant"]

export const guardiansService = {
  getAll: async () => {
    const users = await httpClient.get("/users")
    // Each guardian is linked to a student (users shifted by 1 position for realistic linking)
    return users.map((u, i) => {
      const studentUser = users[(i + 1) % users.length]
      return {
        id:           u.id + 200,
        guardianId:   `GRD-${400 + u.id}`,
        name:         u.name,
        email:        u.email,
        phone:        u.phone,
        city:         u.address.city,
        company:      u.company.name,
        occupation:   OCCUPATIONS[i % OCCUPATIONS.length],
        relation:     RELATIONS[i % RELATIONS.length],
        avatar:       u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        // Linked student
        studentId:    `STU-${1000 + studentUser.id}`,
        studentName:  studentUser.name,
        studentGrade: GRADES[i % GRADES.length],
        studentAvatar: studentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
        // Contact preference
        contactPref:  i % 2 === 0 ? "email" : "phone",
        status:       u.id % 8 === 0 ? "inactive" : "active",
      }
    })
  },
}