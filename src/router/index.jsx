import { createBrowserRouter } from 'react-router-dom' 
import { lazy, Suspense } from 'react' 
import AppShell from '@/components/layouts/AppShell' // Lazy-load each module for code splitting

const Dashboard = lazy(() => import('@/modules/dashboard')) 
const Students = lazy(() => import('@/modules/students')) 
const Teachers = lazy(() => import('@/modules/teachers')) 
const Exams = lazy(() => import('@/modules/exams')) 
const Performance= lazy(() => import('@/modules/performance')) 
const Subjects = lazy(() => import('@/modules/subjects')) 
const Calendar = lazy(() => import('@/modules/calendar'))

export const router = createBrowserRouter([{ path: '/', element: <AppShell />, 
    children: [ 
        { index: true, element: <Suspense><Dashboard /></Suspense> }, 
        { path: 'students/*', element: <Suspense><Students /></Suspense> }, 
        { path: 'teachers/*', element: <Suspense><Teachers /></Suspense> }, 
        { path: 'exams/*', element: <Suspense><Exams /></Suspense> }, 
        { path: 'performance',element: <Suspense><Performance/></Suspense> }, 
        { path: 'subjects/*', element: <Suspense><Subjects /></Suspense> }, 
        { path: 'calendar', element: <Suspense><Calendar /></Suspense> }, 
    ] 
}])