import { BADGE_VARIANTS } from "@/styles/ds"

export const Badge = ({ children, variant = "default" }) => {
  const s = BADGE_VARIANTS[variant] ?? BADGE_VARIANTS.default
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
      letterSpacing: "0.03em",
    }}>
      {children}
    </span>
  )
}