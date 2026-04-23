import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

/**
 * AppShell
 *
 * The root layout for all authenticated pages.
 * Structure:
 *   <aside>  → Sidebar (collapsible, dark)
 *   <div>    → Topbar  (breadcrumbs + search)
 *              <main>  → <Outlet /> (page content)
 */
export default function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar — fixed width, full height */}
      <Sidebar />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Max-width container — keeps content readable on wide screens */}
          <div className="max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}