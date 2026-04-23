import client from '@/api/client' 
export const subjectsApi = { 
    getAll: () => client.get('/subjects'), 
    getById: (id) => client.get(`/subjects/${id}`), 
    create: (data) => client.post('/subjects', data), 
    update: (id, data) => client.put(`/subjects/${id}`, data), 
    delete: (id) => client.delete(`/subjects/${id}`),

    // Syllabus units 
     getUnits: (id) => client.get(`/subjects/${id}/units`), 
     markUnitDone: (subjectId, unitId) => client.patch(`/subjects/${subjectId}/units/${unitId}/complete`), 
     // Which classes take this subject 
      getClasses: (id) => client.get(`/subjects/${id}/classes`), 
      
    }