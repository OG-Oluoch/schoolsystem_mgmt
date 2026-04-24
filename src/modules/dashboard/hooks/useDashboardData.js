// All dashboard chart/feed data lives here.
// Swap these out for real API calls when the backend is ready.

export const useEnrollmentData = () => [
  { m: "Sep", n: 178 },
  { m: "Oct", n: 192 },
  { m: "Nov", n: 201 },
  { m: "Dec", n: 196 },
  { m: "Jan", n: 213 },
  { m: "Feb", n: 228 },
  { m: "Mar", n: 234 },
]

export const useAttendanceData = () => [
  { m: "Sep", pct: 94 },
  { m: "Oct", pct: 91 },
  { m: "Nov", pct: 88 },
  { m: "Dec", pct: 90 },
  { m: "Jan", pct: 95 },
  { m: "Feb", pct: 96 },
  { m: "Mar", pct: 93 },
]

export const useGradeBreakdown = () => [
  { name: "Grade 9",  value: 58, color: "#4338ca" },
  { name: "Grade 10", value: 62, color: "#10b981" },
  { name: "Grade 11", value: 55, color: "#f59e0b" },
  { name: "Grade 12", value: 59, color: "#ef4444" },
]

export const useRecentActivity = () => [
  { icon: "🎓", msg: "Leanne Graham enrolled in Biology",        time: "2 min ago"  },
  { icon: "📝", msg: "New grade report submitted for Grade 10",  time: "15 min ago" },
  { icon: "👨‍🏫", msg: "Ervin Howell joined Mathematics dept",    time: "1 hr ago"   },
  { icon: "📚", msg: "Computer Science course updated",           time: "3 hrs ago"  },
  { icon: "✅", msg: "Attendance marked for Spring 2025",         time: "4 hrs ago"  },
]