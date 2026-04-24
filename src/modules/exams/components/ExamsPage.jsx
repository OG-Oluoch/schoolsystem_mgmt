// export default function ExamsPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Exams</h1>
//       <p className="text-slate-500 mt-1">Schedule and manage exams.</p>
//     </div>
//   )
// }

import { useState, useMemo } from "react"
import { useExams } from "../hooks/useExams"
import {
  Badge, Table, SearchBar, SelectFilter,
  PrimaryButton, SectionHeader, LoadingSpinner, ErrorView,
} from "@/components/ui"
import { DS } from "@/styles/ds"

const STATUS_VARIANT = { upcoming: "info", ongoing: "warning", completed: "success" }

export default function ExamsPage() {
  const { data, loading, error, refetch } = useExams()
  const [search, setSearch]             = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [gradeFilter, setGradeFilter]   = useState("all")

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase()
    return data.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.examId.toLowerCase().includes(q)
      const matchStatus = statusFilter === "all" || e.status === statusFilter
      const matchGrade  = gradeFilter  === "all" || e.grade  === gradeFilter
      return matchSearch && matchStatus && matchGrade
    })
  }, [data, search, statusFilter, gradeFilter])

  if (loading) return <LoadingSpinner label="Loading exams from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  // Summary counts
  const counts = { upcoming: 0, ongoing: 0, completed: 0 }
  data.forEach((e) => counts[e.status]++)

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Exams"
        subtitle={`${filtered.length} exam records`}
        action={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search exams..." />
            <SelectFilter value={gradeFilter} onChange={setGradeFilter} options={[
              { value: "all",      label: "All Grades" },
              { value: "Grade 9",  label: "Grade 9"    },
              { value: "Grade 10", label: "Grade 10"   },
              { value: "Grade 11", label: "Grade 11"   },
              { value: "Grade 12", label: "Grade 12"   },
            ]} />
            <SelectFilter value={statusFilter} onChange={setStatusFilter} options={[
              { value: "all",       label: "All Status" },
              { value: "upcoming",  label: "Upcoming"   },
              { value: "ongoing",   label: "Ongoing"    },
              { value: "completed", label: "Completed"  },
            ]} />
            <PrimaryButton>+ Schedule Exam</PrimaryButton>
          </div>
        }
      />

      {/* Summary pills */}
      <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
        {[
          { label: "Upcoming",  count: counts.upcoming,  color: DS.info,    bg: DS.infoLight    },
          { label: "Ongoing",   count: counts.ongoing,   color: DS.warning, bg: DS.warningLight },
          { label: "Completed", count: counts.completed, color: DS.success, bg: DS.successLight },
        ].map(({ label, count, color, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color }}>{count}</span>
            <span style={{ fontSize: 13, color, fontWeight: 600 }}>{label}</span>
          </div>
        ))}
      </div>

      <Table
        columns={["Exam", "ID", "Subject", "Teacher", "Grade", "Date", "Duration", "Marks", "Room", "Status", ""]}
        rows={filtered}
        renderRow={(e) => [
          <td key="title" style={{ padding: "13px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: DS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📝</div>
              <span style={{ fontWeight: 700, fontSize: 13, color: DS.text }}>{e.title}</span>
            </div>
          </td>,
          <td key="id"       style={{ padding: "13px 20px", fontSize: 11, color: DS.textMuted, fontFamily: "monospace" }}>{e.examId}</td>,
          <td key="subject"  style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{e.subject}</td>,
          <td key="teacher"  style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{e.teacher}</td>,
          <td key="grade"    style={{ padding: "13px 20px" }}><Badge variant="info">{e.grade}</Badge></td>,
          <td key="date"     style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub, whiteSpace: "nowrap" }}>{e.date}</td>,
          <td key="dur"      style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{e.duration} min</td>,
          <td key="marks"    style={{ padding: "13px 20px", fontSize: 13, fontWeight: 700, color: DS.text }}>{e.passMark}/{e.totalMarks}</td>,
          <td key="room"     style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{e.room}</td>,
          <td key="status"   style={{ padding: "13px 20px" }}><Badge variant={STATUS_VARIANT[e.status]}>{e.status}</Badge></td>,
          <td key="action"   style={{ padding: "13px 20px" }}>
            <button style={{ padding: "5px 12px", border: `1px solid ${DS.border}`, borderRadius: 7, fontSize: 12, cursor: "pointer", background: "transparent", color: DS.textSub }}>
              View
            </button>
          </td>,
        ]}
      />
    </div>
  )
}