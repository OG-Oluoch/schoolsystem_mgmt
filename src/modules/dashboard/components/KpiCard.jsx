import { DS } from "@/styles/ds"

export const KpiCard = ({ icon, label, value, delta, accent }) => (
  <div style={{
    background: DS.surface, borderRadius: 14, padding: "18px 22px",
    border: `1px solid ${DS.border}`, display: "flex", alignItems: "center", gap: 14,
  }}>
    <div style={{
      width: 50, height: 50, borderRadius: 13,
      background: accent + "18", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: 22, flexShrink: 0,
    }}>
      {icon}
    </div>
    <div style={{ minWidth: 0 }}>
      <p style={{ margin: 0, fontSize: 12, color: DS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </p>
      <p style={{ margin: "4px 0 2px", fontSize: 26, fontWeight: 800, color: DS.text, lineHeight: 1 }}>
        {value}
      </p>
      {delta !== undefined && (
        <p style={{ margin: 0, fontSize: 11, color: delta >= 0 ? DS.success : DS.danger }}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% vs last month
        </p>
      )}
    </div>
  </div>
)