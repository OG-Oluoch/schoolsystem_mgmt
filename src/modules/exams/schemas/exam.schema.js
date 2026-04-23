import { z } from 'zod' 

export const examSchema = z.object({ 
    title: z.string().min(3), 
    subjectId: z.string().uuid(), 
    classId: z.string().uuid(), 
    date: z.string().date(), 
    startTime: z.string(), 
    duration: z.number().min(30).max(240), 
    // minutes 
     totalMarks:z.number().min(1), 
     passMark: z.number(), 
    }) 
     
     export const gradeSchema = z.object({ 
        studentId: z.string().uuid(), 
        examId: z.string().uuid(), 
        marks: z.number().min(0), 
        remarks: z.string().optional(), 
      })