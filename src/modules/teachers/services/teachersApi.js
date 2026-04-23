import client from '@/api/client' 

export const teachersApi = { 
    getAll: (params) => client.get('/teachers', { params }), 
    getById: (id) => client.get(`/teachers/${id}`), 
    create: (data) => client.post('/teachers', data), 
    update: (id, data) => client.put(`/teachers/${id}`, data), 
    delete: (id) => client.delete(`/teachers/${id}`),
     
    // Assign teacher to subject 
     assignSubject: (teacherId, subjectId) => client.post(`/teachers/${teacherId}/subjects/${subjectId}`), 
     getSchedule: (id) => client.get(`/teachers/${id}/schedule`), }