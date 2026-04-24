// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
//       <p className="text-slate-500 mt-1">Welcome to SchoolManager.</p>
//     </div>
//   )
// }

import { DS } from "@/styles/ds"
import { KpiRow }             from "./components/KpiRow"
import { EnrollmentChart }    from "./components/EnrollmentChart"
import { GradeBreakdownChart} from "./components/GradeBreakdownChart"
import { AttendanceChart }    from "./components/AttendanceChart"
import { RecentActivity }     from "./components/RecentActivity"

export default function DashboardPage() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 1280 }}>

      {/* Page title */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: DS.text, letterSpacing: "-0.02em" }}>
          Good morning, Admin 👋
        </h2>
        <p style={{ margin: "6px 0 0", color: DS.textSub, fontSize: 14 }}>
          Academic Year 2024–2025 · Spring Semester
        </p>
      </div>

      {/* KPIs */}
      <KpiRow />

      {/* Charts — top row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <EnrollmentChart />
        <GradeBreakdownChart />
      </div>

      {/* Charts — bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <AttendanceChart />
        <RecentActivity />
      </div>

    </div>
  )
}