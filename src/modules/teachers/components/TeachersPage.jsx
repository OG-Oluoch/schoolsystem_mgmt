// export default function TeachersPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Teachers</h1>
//       <p className="text-slate-500 mt-1">Manage teacher profiles.</p>
//     </div>
//   )
// }

import { useState, useMemo } from "react"
import { useTeachers } from "../hooks/useTeachers"
import {
  Avatar, Badge, SearchBar, SelectFilter,
  PrimaryButton, SectionHeader, LoadingSpinner, ErrorView,
} from "@/components/ui"
import { DS } from "@/styles/ds"

const DEPT_COLORS = { STEM: DS.primary, Humanities: DS.success, Arts: DS.warning, Sports: DS.danger }

export default function TeachersPage() {
  const { data, loading, error, refetch } = useTeachers()
  const [search, setSearch]   = useState("")
  const [deptFilter, setDeptFilter] = useState("all")

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase()
    return data.filter((t) => {
      const matchSearch = t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)
      const matchDept   = deptFilter === "all" || t.department === deptFilter
      return matchSearch && matchDept
    })
  }, [data, search, deptFilter])

  if (loading) return <LoadingSpinner label="Loading teachers from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Teachers"
        subtitle={`${filtered.length} faculty members`}
        action={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search teachers..." />
            <SelectFilter value={deptFilter} onChange={setDeptFilter} options={[
              { value: "all",        label: "All Departments" },
              { value: "STEM",       label: "STEM"            },
              { value: "Humanities", label: "Humanities"      },
              { value: "Arts",       label: "Arts"            },
              { value: "Sports",     label: "Sports"          },
            ]} />
            <PrimaryButton>+ Add Teacher</PrimaryButton>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {filtered.map((t) => {
          const accent = DEPT_COLORS[t.department] || DS.primary
          return (
            <div key={t.id} style={{
              background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`,
              overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s", cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}18` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
            >
              <div style={{ height: 5, background: accent }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
                  <Avatar initials={t.avatar} color={accent} size={46} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: DS.text }}>{t.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: DS.textSub }}>{t.subject}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 11, color: DS.textMuted, fontFamily: "monospace" }}>{t.staffId}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, borderTop: `1px solid ${DS.surfaceAlt}`, paddingTop: 14 }}>
                  {[
                    ["Department", <Badge key="d" variant="info">{t.department}</Badge>],
                    ["Students",   <span key="s" style={{ fontWeight: 700, color: DS.text }}>{t.studentsCount}</span>],
                    ["Experience", <span key="e" style={{ color: DS.textSub }}>{t.yearsExp} yrs</span>],
                    ["Contact",    <span key="c" style={{ color: accent, fontWeight: 600 }}>{t.email.split("@")[0]}</span>],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                      <span style={{ color: DS.textMuted }}>{label}</span>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}