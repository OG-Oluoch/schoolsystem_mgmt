import { z } from 'zod' 
export const studentSchema = z.object({ 
    firstName: z.string().min(2), 
    lastName: z.string().min(2), 
    email: z.string().email(), 
    grade: z.string(), 
    dob: z.string().date(), 
    guardianName: z.string().min(2), 
    guardianPhone: z.string().min(10), 
})