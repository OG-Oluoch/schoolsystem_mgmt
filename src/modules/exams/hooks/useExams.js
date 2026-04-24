// export function useExamResults(examId) { 
//     return useQuery({ queryKey: ['exams', examId, 'results'], 
//         queryFn: () => examsApi.getResults(examId), 
//         select: (data) => ({ ...data, passRate: data.results.filter(r=>r.marks>=data.passMark).length / data.results.length * 100, 
//             average: data.results.reduce((s,r)=>s+r.marks,0)/data.results.length }) }) } 
            
// export function useBulkGradeEntry() { 
//     const qc = useQueryClient() 
//     return useMutation({ 
//         mutationFn: ({ examId, grades }) => examsApi.bulkGrades(examId, grades), 
//         onSuccess: (_, { examId }) => qc.invalidateQueries(['exams', examId]), }) 
//     }

import { useAsync } from "@/hooks/useAsync"
import { examsService } from "../services/examsService"

export const useExams = () => useAsync(examsService.getAll)