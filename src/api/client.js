import axios from 'axios'

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL, 
    timeout: 10000, headers: { 'Content-Type': 'application/json' } })

    // Attach auth token on every request
    client.interceptors.request.use(config => { const token = localStorage.getItem('token') 
        if (token)
         config.headers.Authorization = `Bearer ${token}` 
         return config })

         // Global error handling (401 → redirect to login)
         client.interceptors.response.use( res => res.data, 
            err => { if (err.response?.status === 401) window.location.href = '/login' 
                return Promise.reject(err) } ) 


                export { client as httpClient }
                export default client