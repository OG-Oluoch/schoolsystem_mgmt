import { useAsync } from "@/hooks/useAsync"
import { subjectsService } from "../services/subjectsService"

export const useSubjects = () => useAsync(subjectsService.getAll)