import { useAsync } from "@/hooks/useAsync"
import { teachersService } from "../services/teachersService"

export const useTeachers = () => useAsync(teachersService.getAll)