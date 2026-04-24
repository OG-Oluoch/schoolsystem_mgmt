import { useAsync } from "@/hooks/useAsync"
import { guardiansService } from "../services/guardianService"

export const useGuardians = () => useAsync(guardiansService.getAll)