import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { studentsApi } from '../services/studentsApi'

export const studentKeys = { all: ['students'], 
    list: (p) => ['students', 'list', p], 
    detail: (id) => ['students', id], } 

    export function useStudents(params) { 
        return useQuery({ queryKey: studentKeys.list(params), 
            queryFn: () => studentsApi.getAll(params), staleTime: 1000 * 60 * 5, // 5 min cache 
            }) } 
            
    export function useCreateStudent() { 
        const qc = useQueryClient() 
        return useMutation({ mutationFn: studentsApi.create, 
            onSuccess: () => qc.invalidateQueries(studentKeys.all), }) 
        }