import { DS } from "@/styles/ds"

export const LoadingSpinner = ({ label = "Fetching data from API..." }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 14 }}>
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      border: `3px solid ${DS.primaryLight}`,
      borderTopColor: DS.primary,
      animation: "spin 0.7s linear infinite",
    }} />
    <p style={{ color: DS.textSub, fontSize: 13, margin: 0 }}>{label}</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)