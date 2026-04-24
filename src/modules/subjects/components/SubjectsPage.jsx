// export default function SubjectsPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Subjects</h1>
//       <p className="text-slate-500 mt-1">Manage curriculum subjects.</p>
//     </div>
//   )
// }

import { useState, useMemo } from "react"
import { useSubjects } from "../hooks/useSubjects"
import {
  Badge, Table, SearchBar, SelectFilter,
  PrimaryButton, SectionHeader, LoadingSpinner, ErrorView,
} from "@/components/ui"
import { DS, CARD_PALETTES } from "@/styles/ds"

export default function SubjectsPage() {
  const { data, loading, error, refetch } = useSubjects()
  const [search, setSearch]           = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [view, setView]               = useState("grid")

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase()
    return data.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q)
      const matchGrade  = gradeFilter === "all" || c.grade === gradeFilter
      return matchSearch && matchGrade
    })
  }, [data, search, gradeFilter])

  if (loading) return <LoadingSpinner label="Loading subjects from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Subjects"
        subtitle={`${filtered.length} subjects this semester`}
        action={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search subjects..." />
            <SelectFilter value={gradeFilter} onChange={setGradeFilter} options={[
              { value: "all",      label: "All Grades" },
              { value: "Grade 9",  label: "Grade 9"    },
              { value: "Grade 10", label: "Grade 10"   },
              { value: "Grade 11", label: "Grade 11"   },
              { value: "Grade 12", label: "Grade 12"   },
            ]} />
            <div style={{ display: "flex", border: `1px solid ${DS.border}`, borderRadius: 10, overflow: "hidden" }}>
              {["grid","list"].map((v) => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "8px 14px", border: "none", cursor: "pointer", fontSize: 14,
                  background: view === v ? DS.primary : "transparent",
                  color: view === v ? "#fff" : DS.textSub, transition: "all 0.15s",
                }}>{v === "grid" ? "⊞" : "☰"}</button>
              ))}
            </div>
            <PrimaryButton>+ Add Subject</PrimaryButton>
          </div>
        }
      />

      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
          {filtered.map((c) => {
            const pal = CARD_PALETTES[c.color] || CARD_PALETTES.indigo
            return (
              <div key={c.id} style={{
                background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`,
                overflow: "hidden", cursor: "pointer", transition: "transform 0.18s, box-shadow 0.18s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${pal.bar}20` }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
              >
                <div style={{ height: 6, background: pal.bar }} />
                <div style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: pal.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📖</div>
                    <span style={{ background: pal.bg, color: pal.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{c.code}</span>
                  </div>
                  <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800, color: DS.text }}>{c.name}</h3>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: DS.textSub }}>{c.teacher}</p>
                  <p style={{ margin: "0 0 14px", fontSize: 12, color: DS.textMuted, lineHeight: 1.5 }}>{c.description}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge variant="default">{c.grade}</Badge>
                    <Badge variant="default">{c.schedule}</Badge>
                    <Badge variant="info">{c.credits} cr</Badge>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: `1px solid ${DS.surfaceAlt}`, fontSize: 13 }}>
                    <span style={{ color: DS.textSub }}>👥 {c.students} enrolled</span>
                    <span style={{ color: pal.bar, fontWeight: 700 }}>View →</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <Table
          columns={["Subject", "Code", "Teacher", "Grade", "Schedule", "Credits", "Students", ""]}
          rows={filtered}
          renderRow={(c) => {
            const pal = CARD_PALETTES[c.color] || CARD_PALETTES.indigo
            return [
              <td key="name" style={{ padding: "13px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: pal.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📖</div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: DS.text }}>{c.name}</span>
                </div>
              </td>,
              <td key="code"     style={{ padding: "13px 20px" }}><span style={{ background: pal.bg, color: pal.text, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{c.code}</span></td>,
              <td key="teacher"  style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{c.teacher}</td>,
              <td key="grade"    style={{ padding: "13px 20px" }}><Badge variant="info">{c.grade}</Badge></td>,
              <td key="schedule" style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{c.schedule}</td>,
              <td key="credits"  style={{ padding: "13px 20px", fontSize: 13, fontWeight: 700, color: DS.text }}>{c.credits}</td>,
              <td key="students" style={{ padding: "13px 20px", fontSize: 13, color: DS.textSub }}>{c.students}</td>,
              <td key="action"   style={{ padding: "13px 20px" }}>
                <button style={{ padding: "5px 12px", border: `1px solid ${DS.border}`, borderRadius: 7, fontSize: 12, cursor: "pointer", background: "transparent", color: DS.textSub }}>View</button>
              </td>,
            ]
          }}
        />
      )}
    </div>
  )
}