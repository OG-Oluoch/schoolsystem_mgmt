import { DS } from "@/styles/ds"
import { useAttendanceData } from "../hooks/useDashboardData"
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

export const AttendanceChart = () => {
  const data = useAttendanceData()

  return (
    <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, padding: "22px 24px" }}>
      <p style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: DS.text }}>Monthly Attendance (%)</p>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke={DS.surfaceAlt} vertical={false} />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: DS.textMuted }} axisLine={false} tickLine={false} />
          <YAxis domain={[80, 100]} tick={{ fontSize: 11, fill: DS.textMuted }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: `1px solid ${DS.border}`, fontSize: 13 }}
            formatter={(v) => [`${v}%`, "Attendance"]}
          />
          <Bar dataKey="pct" fill={DS.success} radius={[6, 6, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}