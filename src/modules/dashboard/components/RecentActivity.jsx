import { DS } from "@/styles/ds"
import { useRecentActivity } from "../hooks/useDashboardData"

export const RecentActivity = () => {
  const items = useRecentActivity()

  return (
    <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, padding: "22px 24px" }}>
      <p style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: DS.text }}>Recent Activity</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{a.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: DS.text, lineHeight: 1.4 }}>{a.msg}</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: DS.textMuted }}>{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}