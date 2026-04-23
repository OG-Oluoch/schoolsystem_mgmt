import client from '@/api/client'

export const studentsApi = { getAll: (params) => client.get('/students', { params }), 
    getById: (id) => client.get(`/students/${id}`), 
    create: (data) => client.post('/students', data), 
    update: (id, data) => client.put(`/students/${id}`, data), 
    delete: (id) => client.delete(`/students/${id}`), 
    getPerformance: (id) => client.get(`/students/${id}/performance`) }