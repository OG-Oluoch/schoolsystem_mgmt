import { useState, useMemo } from "react"
import { useGuardians } from "../hooks/useGuardians"
import {
  Avatar, Badge, SearchBar, SelectFilter,
  PrimaryButton, SectionHeader, LoadingSpinner, ErrorView,
} from "@/components/ui"
import { DS, GRADE_COLORS } from "@/styles/ds"

const RELATION_COLORS = {
  Father: DS.primary, Mother: "#ec4899", Uncle: DS.success,
  Aunt: "#f97316", Grandfather: DS.warning, Grandmother: "#a855f7",
  "Legal Guardian": DS.info, "Elder Sibling": DS.success,
}

export default function GuardiansPage() {
  const { data, loading, error, refetch } = useGuardians()
  const [search, setSearch]               = useState("")
  const [relationFilter, setRelationFilter] = useState("all")
  const [statusFilter, setStatusFilter]   = useState("all")

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase()
    return data.filter((g) => {
      const matchSearch   = g.name.toLowerCase().includes(q) || g.studentName.toLowerCase().includes(q) || g.guardianId.toLowerCase().includes(q)
      const matchRelation = relationFilter === "all" || g.relation === relationFilter
      const matchStatus   = statusFilter   === "all" || g.status   === statusFilter
      return matchSearch && matchRelation && matchStatus
    })
  }, [data, search, relationFilter, statusFilter])

  if (loading) return <LoadingSpinner label="Loading guardians from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Guardians"
        subtitle={`${filtered.length} of ${data.length} registered guardians`}
        action={
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search guardians..." />
            <SelectFilter value={relationFilter} onChange={setRelationFilter} options={[
              { value: "all",            label: "All Relations"    },
              { value: "Father",         label: "Father"           },
              { value: "Mother",         label: "Mother"           },
              { value: "Uncle",          label: "Uncle"            },
              { value: "Aunt",           label: "Aunt"             },
              { value: "Grandfather",    label: "Grandfather"      },
              { value: "Grandmother",    label: "Grandmother"      },
              { value: "Legal Guardian", label: "Legal Guardian"   },
              { value: "Elder Sibling",  label: "Elder Sibling"    },
            ]} />
            <SelectFilter value={statusFilter} onChange={setStatusFilter} options={[
              { value: "all",      label: "All Status" },
              { value: "active",   label: "Active"     },
              { value: "inactive", label: "Inactive"   },
            ]} />
            <PrimaryButton>+ Add Guardian</PrimaryButton>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map((g) => {
          const accent = RELATION_COLORS[g.relation] || DS.primary
          return (
            <div key={g.id} style={{
              background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`,
              overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s", cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${accent}18` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
            >
              {/* Accent bar */}
              <div style={{ height: 4, background: accent }} />

              <div style={{ padding: 18 }}>
                {/* Guardian header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <Avatar initials={g.avatar} color={accent} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: DS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.name}</p>
                      <Badge variant={g.status === "active" ? "success" : "danger"}>{g.status}</Badge>
                    </div>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: DS.textMuted, fontFamily: "monospace" }}>{g.guardianId}</p>
                    <div style={{ marginTop: 5 }}>
                      <span style={{ background: accent + "20", color: accent, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{g.relation}</span>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: `1px solid ${DS.surfaceAlt}`, paddingTop: 12, marginBottom: 12 }}>
                  {[
                    ["📧", g.email],
                    ["📱", g.phone],
                    ["🏙️", g.city],
                    ["💼", g.occupation],
                  ].map(([icon, val]) => (
                    <div key={val} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: DS.textSub }}>
                      <span style={{ flexShrink: 0 }}>{icon}</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Linked student */}
                <div style={{
                  background: DS.bg, borderRadius: 10, padding: "10px 14px",
                  border: `1px solid ${DS.border}`,
                }}>
                  <p style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 700, color: DS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Linked Student</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={g.studentAvatar} color={GRADE_COLORS[g.studentGrade]} size={30} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: DS.text }}>{g.studentName}</p>
                      <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                        <span style={{ fontSize: 10, color: DS.textMuted, fontFamily: "monospace" }}>{g.studentId}</span>
                        <Badge variant="info">{g.studentGrade}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${DS.surfaceAlt}` }}>
                  <div style={{ fontSize: 11, color: DS.textMuted }}>
                    Prefers: <strong style={{ color: accent }}>{g.contactPref}</strong>
                  </div>
                  <button style={{ padding: "5px 14px", border: `1px solid ${DS.border}`, borderRadius: 7, fontSize: 12, cursor: "pointer", background: "transparent", color: DS.textSub }}>
                    View
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}