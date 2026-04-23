import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod' 
import { studentSchema } from '../schemas/student.schema' 
import { useCreateStudent } from '../hooks/useStudents' 

export default function StudentForm({ onSuccess }) { 

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(studentSchema) }) 
    const { mutateAsync, isPending } = useCreateStudent() 
    const onSubmit = async (data) => { await mutateAsync(data) 
        onSuccess?.() } 
        
        return ( <form onSubmit={handleSubmit(onSubmit)}> <input {...register('firstName')} placeholder="First name" /> {errors.firstName && <p>{errors.firstName.message}</p>} {/* ... other fields */} <button type="submit" disabled={isPending}> {isPending ? 'Saving...' : 'Add Student'} </button> </form> ) }