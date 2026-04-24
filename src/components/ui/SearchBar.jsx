import { DS } from "@/styles/ds"

export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div style={{ position: "relative" }}>
    <span style={{
      position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
      fontSize: 14, color: DS.textMuted, pointerEvents: "none",
    }}>
      🔍
    </span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "9px 12px 9px 33px", border: `1px solid ${DS.border}`,
        borderRadius: 10, fontSize: 13, outline: "none",
        width: 220, background: DS.bg, color: DS.text,
        transition: "border-color 0.15s",
      }}
      onFocus={e => e.target.style.borderColor = DS.primary}
      onBlur={e  => e.target.style.borderColor = DS.border}
    />
  </div>
)