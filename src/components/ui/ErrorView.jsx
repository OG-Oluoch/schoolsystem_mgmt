import { DS } from "@/styles/ds"
import { PrimaryButton } from "./PrimaryButton"

export const ErrorView = ({ message, onRetry }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, gap: 10 }}>
    <span style={{ fontSize: 40 }}>⚠️</span>
    <p style={{ color: DS.danger, fontWeight: 700, margin: 0 }}>Failed to load</p>
    <p style={{ color: DS.textSub, fontSize: 13, margin: 0, maxWidth: 340, textAlign: "center" }}>{message}</p>
    <PrimaryButton onClick={onRetry}>Retry</PrimaryButton>
  </div>
)