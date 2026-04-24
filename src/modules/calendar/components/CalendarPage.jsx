// export default function CalendarPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Calendar</h1>
//       <p className="text-slate-500 mt-1">View and manage school events.</p>
//     </div>
//   )
// }

import { useAsync } from "@/hooks/useAsync"
import { httpClient } from "@/api/client"
import { Badge, SectionHeader, LoadingSpinner, ErrorView, PrimaryButton } from "@/components/ui"
import { DS } from "@/styles/ds"

const TYPES   = ["exam", "holiday", "meeting", "sport", "exam", "holiday", "meeting", "sport", "exam", "holiday"]
const MONTHS  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const TYPE_META = {
  exam:    { color: DS.primary, bg: DS.primaryLight, icon: "📝" },
  holiday: { color: DS.success, bg: DS.successLight, icon: "🏖️" },
  meeting: { color: DS.warning, bg: DS.warningLight, icon: "📅" },
  sport:   { color: "#8b5cf6", bg: "#ede9fe",        icon: "⚽" },
}
const TYPE_VARIANT = { exam: "info", holiday: "success", meeting: "warning", sport: "purple" }

const fetchEvents = async () => {
  const posts = await httpClient.get("/posts?_limit=10")
  return posts.map((p, i) => ({
    id:    p.id,
    title: p.title.slice(0, 38).replace(/\s+\S*$/, "") + "...",
    type:  TYPES[i % TYPES.length],
    day:   (i * 3 + 1) % 28 + 1,
    month: MONTHS[(i + 2) % 12],
    time:  `${8 + (i % 8)}:${i % 2 === 0 ? "00" : "30"} AM`,
    venue: `Room ${100 + i * 4}`,
  }))
}

export default function CalendarPage() {
  const { data, loading, error, refetch } = useAsync(fetchEvents)

  if (loading) return <LoadingSpinner label="Loading calendar events from API..." />
  if (error)   return <ErrorView message={error} onRetry={refetch} />

  const byType = { exam: 0, holiday: 0, meeting: 0, sport: 0 }
  data.forEach((e) => byType[e.type]++)

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>
      <SectionHeader
        title="Calendar Events"
        subtitle={`${data.length} events this semester`}
        action={<PrimaryButton>+ Add Event</PrimaryButton>}
      />

      {/* Type summary */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {Object.entries(TYPE_META).map(([type, meta]) => (
          <div key={type} style={{ background: meta.bg, borderRadius: 10, padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{meta.icon}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 18, color: meta.color }}>{byType[type]}</p>
              <p style={{ margin: 0, fontSize: 11, color: meta.color, textTransform: "capitalize", fontWeight: 600 }}>{type}s</p>
            </div>
          </div>
        ))}
      </div>

      {/* Event cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {data.map((ev) => {
          const meta = TYPE_META[ev.type]
          return (
            <div key={ev.id} style={{
              background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`,
              overflow: "hidden", cursor: "pointer", transition: "transform 0.18s, box-shadow 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${meta.color}18` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}
            >
              <div style={{ height: 4, background: meta.color }} />
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: meta.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                    {meta.icon}
                  </div>
                  <Badge variant={TYPE_VARIANT[ev.type]}>{ev.type}</Badge>
                </div>
                <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 14, color: DS.text, lineHeight: 1.4 }}>{ev.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {[
                    ["📆", `${ev.month} ${ev.day}, 2025`],
                    ["🕐", ev.time],
                    ["📍", ev.venue],
                  ].map(([icon, val]) => (
                    <div key={val} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: DS.textSub }}>
                      <span>{icon}</span><span>{val}</span>
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