import { useApp } from "@/context/AppContext"
import { KpiCard } from "./KpiCard"

export const KpiRow = () => {
  const { students, teachers, courses } = useApp()

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
      <KpiCard icon="🎓" label="Students"    value={students.data?.length ?? "—"} delta={4.5}  accent="#4338ca" />
      <KpiCard icon="👨‍🏫" label="Teachers"   value={teachers.data?.length ?? "—"} delta={2.1}  accent="#10b981" />
      <KpiCard icon="📚" label="Courses"     value={courses.data?.length  ?? "—"} delta={1.8}  accent="#f59e0b" />
      <KpiCard icon="📊" label="Average GPA" value="3.42"                          delta={0.3}  accent="#8b5cf6" />
    </div>
  )
}