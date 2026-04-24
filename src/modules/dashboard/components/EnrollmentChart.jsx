import { DS } from "@/styles/ds"
import { useEnrollmentData } from "../hooks/useDashboardData"
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

export const EnrollmentChart = () => {
  const data = useEnrollmentData()

  return (
    <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, padding: "22px 24px" }}>
      <p style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: DS.text }}>Enrollment Trend</p>
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke={DS.surfaceAlt} />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: DS.textMuted }} axisLine={false} tickLine={false} />
          <YAxis domain={[160, 250]} tick={{ fontSize: 11, fill: DS.textMuted }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: `1px solid ${DS.border}`, fontSize: 13 }}
            formatter={(v) => [v, "Students"]}
          />
          <Line
            type="monotone" dataKey="n" stroke={DS.primary}
            strokeWidth={2.5} dot={{ fill: DS.primary, r: 4 }} name="Students"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}