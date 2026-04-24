import { useAsync } from "@/hooks/useAsync"
import { teachersService } from "../services/teacherService"

export const useTeachers = () => useAsync(teachersService.getAll)