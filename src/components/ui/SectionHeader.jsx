import { DS } from "@/styles/ds"

export const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
    <div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: DS.text, letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: "5px 0 0", color: DS.textSub, fontSize: 14 }}>{subtitle}</p>
      )}
    </div>
    {action}
  </div>
)