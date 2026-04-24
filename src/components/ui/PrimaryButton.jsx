import { DS } from "@/styles/ds"

export const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "9px 18px", background: DS.primary, color: "#fff",
      border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer",
      fontSize: 13, letterSpacing: "0.01em", whiteSpace: "nowrap",
      transition: "opacity 0.15s",
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
  >
    {children}
  </button>
)