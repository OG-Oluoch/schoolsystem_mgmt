import { useQueries } from '@tanstack/react-query' 
import client from '@/api/client' 
export function useDashboard() { 
    const results = useQueries({ 
        queries: [ { queryKey: ['stats','students'], 
            queryFn: () => client.get('/stats/students') }, 
            { queryKey: ['stats','teachers'], 
                queryFn: () => client.get('/stats/teachers') }, 
                { queryKey: ['stats','exams'], 
                    queryFn: () => client.get('/stats/exams') }, 
                    { queryKey: ['stats','scores'], 
                        queryFn: () => client.get('/stats/scores') }, ]}) 
                        const [students, teachers, exams, scores] = results 
                        return { isLoading: results.some(r => r.isLoading), 
                            students: students.data, 
                            teachers: teachers.data, 
                            exams: exams.data, scores: 
                            scores.data, } }