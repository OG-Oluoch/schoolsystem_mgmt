import httpClient from "@/api/client"

// These endpoints don't exist on JSONPlaceholder — swap in your real API routes.
export const dashboardService = {
  getEnrollmentTrend:  () => httpClient.get("/dashboard/enrollment"),
  getAttendanceTrend:  () => httpClient.get("/dashboard/attendance"),
  getGradeBreakdown:   () => httpClient.get("/dashboard/grades/breakdown"),
  getRecentActivity:   () => httpClient.get("/dashboard/activity"),
  getSummaryStats:     () => httpClient.get("/dashboard/stats"),
}