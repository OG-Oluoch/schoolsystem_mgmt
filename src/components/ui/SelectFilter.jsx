import { DS } from "@/styles/ds"

export const SelectFilter = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: "9px 12px", border: `1px solid ${DS.border}`, borderRadius: 10,
      fontSize: 13, background: DS.bg, color: DS.text, cursor: "pointer", outline: "none",
    }}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
)