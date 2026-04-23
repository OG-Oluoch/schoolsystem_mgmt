import { useLocation, Link } from 'react-router-dom'
import { Bell, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// ─── Route → breadcrumb label map ───────────────────────────────────────────
const ROUTE_LABELS = {
  '':            'Dashboard',
  students:      'Students',
  teachers:      'Teachers',
  subjects:      'Subjects',
  exams:         'Exams',
  performance:   'Performance',
  calendar:      'Calendar',
  new:           'New',
  edit:          'Edit',
}

// ─── Build breadcrumbs from the current pathname ─────────────────────────────
function useBreadcrumbs() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: 'Dashboard', to: '/', current: true }]

  const crumbs = [{ label: 'Dashboard', to: '/', current: false }]
  let path = ''
  segments.forEach((seg, i) => {
    path += `/${seg}`
    const isId = /^[0-9a-f-]{8,}$/i.test(seg) // skip raw UUIDs
    const label = isId ? 'Detail' : (ROUTE_LABELS[seg] ?? seg)
    crumbs.push({ label, to: path, current: i === segments.length - 1 })
  })
  return crumbs
}

// ─── Topbar ──────────────────────────────────────────────────────────────────
export default function Topbar() {
  const crumbs = useBreadcrumbs()
  const [query, setQuery] = useState('')

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100 shrink-0">
      {/* ── Left: breadcrumbs ─────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm">
          {crumbs.map((crumb, i) => (
            <li key={crumb.to} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight size={13} className="text-slate-300 shrink-0" />
              )}
              {crumb.current ? (
                <span className="font-semibold text-slate-800">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Right: search + notifications ────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={[
              'h-9 pl-8 pr-3 rounded-lg text-sm bg-slate-50 border border-slate-200',
              'placeholder-slate-400 text-slate-700',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              'transition-all duration-200 w-48 focus:w-64',
            ].join(' ')}
          />
        </div>

        {/* Notifications bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg
                     text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} strokeWidth={1.8} />
          {/* Unread badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>
      </div>
    </header>
  )
}