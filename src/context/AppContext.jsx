import { createContext, useContext, useState } from "react"
import { useStudents } from "@/modules/students/hooks/useStudents"
import { useTeachers } from "@/modules/teachers/hooks/useTeachers"
import { useCourses }  from "@/modules/courses/hooks/useCourses"
import { useGrades }   from "@/modules/grades/hooks/useGrades"

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const students = useStudents()
  const teachers = useTeachers()
  const courses  = useCourses()
  const grades   = useGrades()

  return (
    <AppContext.Provider value={{ students, teachers, courses, grades }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>")
  return ctx
}