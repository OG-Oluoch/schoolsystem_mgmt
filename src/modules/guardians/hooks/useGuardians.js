import { useAsync } from "@/hooks/useAsync"
import { guardiansService } from "../services/guardiansService"

export const useGuardians = () => useAsync(guardiansService.getAll)