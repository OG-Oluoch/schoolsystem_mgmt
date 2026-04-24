// export default function PerformancePage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Performance</h1>
//       <p className="text-slate-500 mt-1">Track academic performance trends.</p>
//     </div>
//   )
// }

import { useState, useMemo } from "react"
import { usePerformance } from "../hooks/usePerformance"
import { Avatar, Badge, SearchBar, SectionHeader, LoadingSpinner, ErrorView } from "@/components/ui"
import { DS } from "@/styles/ds"

const scoreColor = (n) => n >= 90 ? DS.success : n >= 75 ? DS.primary : n >= 60 ? DS.warning : DS.danger
const letterVariant = (l) => ({ A: "success", B: "info", C: "warning", D: "danger" }[l] || "default")
const gpaColor = (g) => g >= 3.5 ? DS.success : g >= 2.5 ? DS.primary : g >= 2.0 ? DS.warning : DS.danger

export default function PerformancePage() {
  const { data, loading, error, refetch } = usePerformance()
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase()
    return data.filter((g) => g.student.toLowerCase().includes(q) || g.studentId.toLowerCase().includes(q))
  }, [data, search])

  if (loading) return <LoadingSpinner label="Loading grade records from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Performance"
        subtitle="Spring 2025 Term — All Students"
        action={<SearchBar value={search} onChange={setSearch} placeholder="Search student..." />}
      />

      <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 780 }}>
          <thead>
            <tr style={{ background: DS.bg, borderBottom: `1px solid ${DS.border}` }}>
              <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Student</th>
              {["Math","English","Science","History","CS"].map((s) => (
                <th key={s} style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s}</th>
              ))}
              <th style={{ padding: "12px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>GPA</th>
              <th style={{ padding: "12px 20px", textAlign: "center", fontSize: 11, fontWeight: 700, color: DS.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Term</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id}
                style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${DS.surfaceAlt}` : "none", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = DS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "13px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={row.avatar} color={DS.primary} size={34} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: DS.text }}>{row.student}</p>
                      <p style={{ margin: 0, fontSize: 11, color: DS.textMuted, fontFamily: "monospace" }}>{row.studentId}</p>
                    </div>
                  </div>
                </td>
                {row.grades.map((g) => (
                  <td key={g.subject} style={{ padding: "13px 16px", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: scoreColor(g.score) }}>{g.score}</span>
                      <Badge variant={letterVariant(g.letter)}>{g.letter}</Badge>
                    </div>
                  </td>
                ))}
                <td style={{ padding: "13px 20px", textAlign: "center" }}>
                  <span style={{ fontWeight: 900, fontSize: 18, color: gpaColor(row.gpa) }}>{row.gpa}</span>
                </td>
                <td style={{ padding: "13px 20px", textAlign: "center" }}>
                  <Badge variant="default">{row.term}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}