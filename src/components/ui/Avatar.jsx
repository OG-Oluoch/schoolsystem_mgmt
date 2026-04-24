export const Avatar = ({ initials, color, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color + "22", color,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: size * 0.33, flexShrink: 0,
    letterSpacing: "0.04em",
  }}>
    {initials}
  </div>
)