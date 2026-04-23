import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  ClipboardList,
  TrendingUp,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  School,
  LogOut,
  Settings,
} from 'lucide-react'

// ─── Nav config ────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { to: '/',           label: 'Dashboard',   icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/students',   label: 'Students',    icon: GraduationCap },
      { to: '/teachers',   label: 'Teachers',    icon: Users },
    ],
  },
  {
    label: 'Academics',
    items: [
      { to: '/subjects',   label: 'Subjects',    icon: BookOpen },
      { to: '/exams',      label: 'Exams',       icon: ClipboardList },
      { to: '/performance',label: 'Performance', icon: TrendingUp },
    ],
  },
  {
    label: 'Schedule',
    items: [
      { to: '/calendar',   label: 'Calendar',    icon: CalendarDays },
    ],
  },
]

// ─── NavItem ────────────────────────────────────────────────────────────────
function NavItem({ item, collapsed }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.to}
      end={item.end}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        [
          'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
          'transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          isActive
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/20'
            : 'text-slate-400 hover:text-white hover:bg-white/8',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            strokeWidth={isActive ? 2.2 : 1.8}
            className="shrink-0 transition-transform duration-150 group-hover:scale-110"
          />
          {!collapsed && (
            <span className="truncate leading-none">{item.label}</span>
          )}
          {/* Active dot for collapsed mode */}
          {collapsed && isActive && (
            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white" />
          )}
        </>
      )}
    </NavLink>
  )
}

// ─── SectionLabel ───────────────────────────────────────────────────────────
function SectionLabel({ label, collapsed }) {
  if (collapsed) {
    return <div className="mx-3 my-1 h-px bg-white/10" />
  }
  return (
    <p className="px-3 pt-5 pb-1 text-[10px] font-semibold tracking-widest uppercase text-slate-500 select-none">
      {label}
    </p>
  )
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={[
        'relative flex flex-col h-screen bg-slate-900 border-r border-white/5',
        'transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-[64px]' : 'w-[230px]',
      ].join(' ')}
    >
      {/* ── Logo ─────────────────────────────────────────────── */}
      <div
        className={[
          'flex items-center h-16 border-b border-white/8 shrink-0 overflow-hidden',
          collapsed ? 'justify-center px-0' : 'gap-2.5 px-4',
        ].join(' ')}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 shrink-0">
          <School size={16} className="text-white" strokeWidth={2} />
        </div>
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <p className="text-white font-semibold text-[13px] truncate">SchoolManager</p>
            <p className="text-slate-500 text-[10px] truncate">Admin Portal</p>
          </div>
        )}
      </div>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 space-y-0.5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <SectionLabel label={section.label} collapsed={collapsed} />
            {section.items.map((item) => (
              <div key={item.to} className="relative">
                <NavItem item={item} collapsed={collapsed} />
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Bottom actions ───────────────────────────────────── */}
      <div className="shrink-0 border-t border-white/8 p-2 space-y-0.5">
        <button
          className={[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
            'text-slate-400 hover:text-white hover:bg-white/8 transition-colors',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={17} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && <span className="truncate">Settings</span>}
        </button>
        <button
          className={[
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
            'text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
          title={collapsed ? 'Log out' : undefined}
        >
          <LogOut size={17} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && <span className="truncate">Log out</span>}
        </button>

        {/* User pill */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-lg bg-white/5">
            <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-medium truncate">Admin User</p>
              <p className="text-slate-500 text-[10px] truncate">admin@school.edu</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center pt-1">
            <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[11px] font-bold text-white">
              AD
            </div>
          </div>
        )}
      </div>

      {/* ── Collapse toggle ──────────────────────────────────── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={[
          'absolute -right-3 top-[72px] z-10',
          'w-6 h-6 rounded-full bg-slate-800 border border-white/15',
          'flex items-center justify-center text-slate-400',
          'hover:text-white hover:bg-slate-700 transition-colors shadow-md',
        ].join(' ')}
      >
        {collapsed
          ? <ChevronRight size={12} strokeWidth={2.5} />
          : <ChevronLeft  size={12} strokeWidth={2.5} />
        }
      </button>
    </aside>
  )
}