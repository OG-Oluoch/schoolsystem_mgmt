// export default function StudentsPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Students</h1>
//       <p className="text-slate-500 mt-1">Manage student records.</p>
//     </div>
//   )
// }

import { useState, useMemo } from "react"
import { useStudents } from "../hooks/useStudents"
import {
  Avatar, Badge, Table, SearchBar, SelectFilter,
  PrimaryButton, SectionHeader, LoadingSpinner, ErrorView,
} from "@/components/ui"
import { DS, GRADE_COLORS } from "@/styles/ds"

const gpaColor = (gpa) =>
  gpa >= 3.5 ? DS.success : gpa >= 3.0 ? DS.primary : gpa >= 2.5 ? DS.warning : DS.danger

export default function StudentsPage() {
  const { data, loading, error, refetch } = useStudents()
  const [search, setSearch]         = useState("")
  const [gradeFilter, setGradeFilter]   = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((s) => {
      const q = search.toLowerCase()
      const matchSearch = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
      const matchGrade  = gradeFilter  === "all" || s.grade  === gradeFilter
      const matchStatus = statusFilter === "all" || s.status === statusFilter
      return matchSearch && matchGrade && matchStatus
    })
  }, [data, search, gradeFilter, statusFilter])

  if (loading) return <LoadingSpinner label="Loading students from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Students"
        subtitle={`${filtered.length} of ${data.length} students`}
        action={
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search students..." />
            <SelectFilter value={gradeFilter} onChange={setGradeFilter} options={[
              { value: "all",      label: "All Grades" },
              { value: "Grade 9",  label: "Grade 9"    },
              { value: "Grade 10", label: "Grade 10"   },
              { value: "Grade 11", label: "Grade 11"   },
              { value: "Grade 12", label: "Grade 12"   },
            ]} />
            <SelectFilter value={statusFilter} onChange={setStatusFilter} options={[
              { value: "all",      label: "All Status" },
              { value: "active",   label: "Active"     },
              { value: "inactive", label: "Inactive"   },
            ]} />
            <PrimaryButton>+ Add Student</PrimaryButton>
          </div>
        }
      />
      <Table
        columns={["Student", "ID", "Email", "City", "Grade", "GPA", "Enrolled", "Status", ""]}
        rows={filtered}
        renderRow={(s) => [
          <td key="name" style={{ padding: "13px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Avatar initials={s.avatar} color={GRADE_COLORS[s.grade]} size={34} />
              <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{s.name}</span>
            </div>
          </td>,
          <td key="sid"    style={{ padding: "13px 20px", fontSize: 12, color: DS.textMuted, fontFamily: "monospace" }}>{s.studentId}</td>,
          <td key="email"  style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{s.email}</td>,
          <td key="city"   style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{s.city}</td>,
          <td key="grade"  style={{ padding: "13px 20px" }}><Badge variant="info">{s.grade}</Badge></td>,
          <td key="gpa"    style={{ padding: "13px 20px" }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: gpaColor(s.gpa) }}>{s.gpa}</span>
          </td>,
          <td key="enroll" style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub, whiteSpace: "nowrap" }}>{s.enrolledDate}</td>,
          <td key="status" style={{ padding: "13px 20px" }}>
            <Badge variant={s.status === "active" ? "success" : "danger"}>{s.status}</Badge>
          </td>,
          <td key="action" style={{ padding: "13px 20px" }}>
            <button style={{ padding: "5px 12px", border: `1px solid ${DS.border}`, borderRadius: 7, fontSize: 12, cursor: "pointer", background: "transparent", color: DS.textSub }}>
              View
            </button>
          </td>,
        ]}
      />
    </div>
  )
}