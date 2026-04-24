// import { createBrowserRouter } from 'react-router-dom' 
// import { lazy, Suspense } from 'react' 
// import AppShell from '@/components/layouts/AppShell' // Lazy-load each module for code splitting

// const Dashboard = lazy(() => import('@/modules/dashboard')) 
// const Students = lazy(() => import('@/modules/students')) 
// const Teachers = lazy(() => import('@/modules/teachers')) 
// const Exams = lazy(() => import('@/modules/exams')) 
// const Performance= lazy(() => import('@/modules/performance')) 
// const Subjects = lazy(() => import('@/modules/subjects')) 
// const Calendar = lazy(() => import('@/modules/calendar'))

// export const router = createBrowserRouter([{ path: '/', element: <AppShell />, 
//     children: [ 
//         { index: true, element: <Suspense><Dashboard /></Suspense> }, 
//         { path: 'students/*', element: <Suspense><Students /></Suspense> }, 
//         { path: 'teachers/*', element: <Suspense><Teachers /></Suspense> }, 
//         { path: 'exams/*', element: <Suspense><Exams /></Suspense> }, 
//         { path: 'performance',element: <Suspense><Performance/></Suspense> }, 
//         { path: 'subjects/*', element: <Suspense><Subjects /></Suspense> }, 
//         { path: 'calendar', element: <Suspense><Calendar /></Suspense> }, 
//     ] 
// }])

// import { createBrowserRouter } from 'react-router-dom'
// import { lazy, Suspense } from 'react'
// import AppShell from '@/components/layouts/AppShell'

// // ─── Lazy-load each module (code splitting per route) ────────────────────────
// const Dashboard   = lazy(() => import('@/modules/dashboard'))
// const Students    = lazy(() => import('@/modules/students'))
// const Teachers    = lazy(() => import('@/modules/teachers'))
// const Exams       = lazy(() => import('@/modules/exams'))
// const Performance = lazy(() => import('@/modules/performance'))
// const Subjects    = lazy(() => import('@/modules/subjects'))
// const Calendar    = lazy(() => import('@/modules/calendar'))

// // ─── Fallback shown while a lazy chunk loads ─────────────────────────────────
// function PageLoader() {
//   return (
//     <div className="flex items-center justify-center h-64">
//       <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//     </div>
//   )
// }

// function Lazy({ children }) {
//   return <Suspense fallback={<PageLoader />}>{children}</Suspense>
// }

// // ─── Router ──────────────────────────────────────────────────────────────────
// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppShell />,
//     children: [
//       { index: true,         element: <Lazy><Dashboard   /></Lazy> },
//       { path: 'students/*',  element: <Lazy><Students    /></Lazy> },
//       { path: 'teachers/*',  element: <Lazy><Teachers    /></Lazy> },
//       { path: 'exams/*',     element: <Lazy><Exams       /></Lazy> },
//       { path: 'performance', element: <Lazy><Performance /></Lazy> },
//       { path: 'subjects/*',  element: <Lazy><Subjects    /></Lazy> },
//       { path: 'calendar',    element: <Lazy><Calendar    /></Lazy> },
//     ],
//   },
// ])

import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AppShell from '@/components/layouts/AppShell'
import { DS } from '@/styles/ds'

const Dashboard   = lazy(() => import('@/modules/dashboard'))
const Students    = lazy(() => import('@/modules/students'))
const Teachers    = lazy(() => import('@/modules/teachers'))
const Guardians   = lazy(() => import('@/modules/guardians'))
const Subjects    = lazy(() => import('@/modules/subjects'))
const Exams       = lazy(() => import('@/modules/exams'))
const Performance = lazy(() => import('@/modules/performance'))
const Calendar    = lazy(() => import('@/modules/calendar'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: `3px solid ${DS.primaryLight}`,
        borderTopColor: DS.primary,
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Lazy({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true,          element: <Lazy><Dashboard   /></Lazy> },
      { path: 'students/*',   element: <Lazy><Students    /></Lazy> },
      { path: 'teachers/*',   element: <Lazy><Teachers    /></Lazy> },
      { path: 'guardians/*',  element: <Lazy><Guardians   /></Lazy> },
      { path: 'subjects/*',   element: <Lazy><Subjects    /></Lazy> },
      { path: 'exams/*',      element: <Lazy><Exams       /></Lazy> },
      { path: 'performance',  element: <Lazy><Performance /></Lazy> },
      { path: 'calendar',     element: <Lazy><Calendar    /></Lazy> },
    ],
  },
])