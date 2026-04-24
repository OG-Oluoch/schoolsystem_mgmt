import { useAsync } from "@/hooks/useAsync"
import { performanceService } from "../services/performanceService"

export const usePerformance = () => useAsync(performanceService.getAll)