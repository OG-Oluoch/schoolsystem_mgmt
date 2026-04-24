import { DS } from "@/styles/ds"
import { useGradeBreakdown } from "../hooks/useDashboardData"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

export const GradeBreakdownChart = () => {
  const data = useGradeBreakdown()

  return (
    <div style={{ background: DS.surface, borderRadius: 14, border: `1px solid ${DS.border}`, padding: "22px 24px" }}>
      <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: DS.text }}>Students by Grade</p>
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%"
            innerRadius={50} outerRadius={78}
            paddingAngle={4} dataKey="value"
          >
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(v) => [`${v} students`]} contentStyle={{ borderRadius: 10, fontSize: 13 }} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px", marginTop: 10 }}>
        {data.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: DS.textSub }}>
            <div style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            {d.name}: <strong style={{ color: DS.text }}>{d.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}