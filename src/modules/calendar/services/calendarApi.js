export const calendarApi = { 

   getEvents: (range) => client.get('/events', 
    { params: { from: range.start.toISOString(), to: range.end.toISOString() }}), 
  
  create: (data) => client.post('/events', data), 
  update: (id, d) => client.put(`/events/${id}`, d), 
  delete: (id) => client.delete(`/events/${id}`), 

}