// import { NavLink, useLocation } from 'react-router-dom'
// import { useState } from 'react'
// import {
//   LayoutDashboard,
//   GraduationCap,
//   Users,
//   ClipboardList,
//   TrendingUp,
//   BookOpen,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   School,
//   LogOut,
//   Settings,
// } from 'lucide-react'

// // ─── Nav config ────────────────────────────────────────────────────────────
// const NAV_SECTIONS = [
//   {
//     label: 'Overview',
//     items: [
//       { to: '/',           label: 'Dashboard',   icon: LayoutDashboard, end: true },
//     ],
//   },
//   {
//     label: 'People',
//     items: [
//       { to: '/students',   label: 'Students',    icon: GraduationCap },
//       { to: '/teachers',   label: 'Teachers',    icon: Users },
//     ],
//   },
//   {
//     label: 'Academics',
//     items: [
//       { to: '/subjects',   label: 'Subjects',    icon: BookOpen },
//       { to: '/exams',      label: 'Exams',       icon: ClipboardList },
//       { to: '/performance',label: 'Performance', icon: TrendingUp },
//     ],
//   },
//   {
//     label: 'Schedule',
//     items: [
//       { to: '/calendar',   label: 'Calendar',    icon: CalendarDays },
//     ],
//   },
// ]

// // ─── NavItem ────────────────────────────────────────────────────────────────
// function NavItem({ item, collapsed }) {
//   const Icon = item.icon

//   return (
//     <NavLink
//       to={item.to}
//       end={item.end}
//       title={collapsed ? item.label : undefined}
//       className={({ isActive }) =>
//         [
//           'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
//           'transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
//           isActive
//             ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-900/20'
//             : 'text-slate-400 hover:text-white hover:bg-white/8',
//         ].join(' ')
//       }
//     >
//       {({ isActive }) => (
//         <>
//           <Icon
//             size={18}
//             strokeWidth={isActive ? 2.2 : 1.8}
//             className="shrink-0 transition-transform duration-150 group-hover:scale-110"
//           />
//           {!collapsed && (
//             <span className="truncate leading-none">{item.label}</span>
//           )}
//           {/* Active dot for collapsed mode */}
//           {collapsed && isActive && (
//             <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white" />
//           )}
//         </>
//       )}
//     </NavLink>
//   )
// }

// // ─── SectionLabel ───────────────────────────────────────────────────────────
// function SectionLabel({ label, collapsed }) {
//   if (collapsed) {
//     return <div className="mx-3 my-1 h-px bg-white/10" />
//   }
//   return (
//     <p className="px-3 pt-5 pb-1 text-[10px] font-semibold tracking-widest uppercase text-slate-500 select-none">
//       {label}
//     </p>
//   )
// }

// // ─── Sidebar ────────────────────────────────────────────────────────────────
// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false)

//   return (
//     <aside
//       className={[
//         'relative flex flex-col h-screen bg-slate-900 border-r border-white/5',
//         'transition-all duration-300 ease-in-out shrink-0',
//         collapsed ? 'w-[64px]' : 'w-[230px]',
//       ].join(' ')}
//     >
//       {/* ── Logo ─────────────────────────────────────────────── */}
//       <div
//         className={[
//           'flex items-center h-16 border-b border-white/8 shrink-0 overflow-hidden',
//           collapsed ? 'justify-center px-0' : 'gap-2.5 px-4',
//         ].join(' ')}
//       >
//         <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 shrink-0">
//           <School size={16} className="text-white" strokeWidth={2} />
//         </div>
//         {!collapsed && (
//           <div className="leading-tight overflow-hidden">
//             <p className="text-white font-semibold text-[13px] truncate">SchoolManager</p>
//             <p className="text-slate-500 text-[10px] truncate">Admin Portal</p>
//           </div>
//         )}
//       </div>

//       {/* ── Nav ──────────────────────────────────────────────── */}
//       <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 space-y-0.5">
//         {NAV_SECTIONS.map((section) => (
//           <div key={section.label}>
//             <SectionLabel label={section.label} collapsed={collapsed} />
//             {section.items.map((item) => (
//               <div key={item.to} className="relative">
//                 <NavItem item={item} collapsed={collapsed} />
//               </div>
//             ))}
//           </div>
//         ))}
//       </nav>

//       {/* ── Bottom actions ───────────────────────────────────── */}
//       <div className="shrink-0 border-t border-white/8 p-2 space-y-0.5">
//         <button
//           className={[
//             'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
//             'text-slate-400 hover:text-white hover:bg-white/8 transition-colors',
//             collapsed ? 'justify-center' : '',
//           ].join(' ')}
//           title={collapsed ? 'Settings' : undefined}
//         >
//           <Settings size={17} strokeWidth={1.8} className="shrink-0" />
//           {!collapsed && <span className="truncate">Settings</span>}
//         </button>
//         <button
//           className={[
//             'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
//             'text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors',
//             collapsed ? 'justify-center' : '',
//           ].join(' ')}
//           title={collapsed ? 'Log out' : undefined}
//         >
//           <LogOut size={17} strokeWidth={1.8} className="shrink-0" />
//           {!collapsed && <span className="truncate">Log out</span>}
//         </button>

//         {/* User pill */}
//         {!collapsed && (
//           <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-lg bg-white/5">
//             <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
//               AD
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-white text-[12px] font-medium truncate">Admin User</p>
//               <p className="text-slate-500 text-[10px] truncate">admin@school.edu</p>
//             </div>
//           </div>
//         )}
//         {collapsed && (
//           <div className="flex justify-center pt-1">
//             <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[11px] font-bold text-white">
//               AD
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Collapse toggle ──────────────────────────────────── */}
//       <button
//         onClick={() => setCollapsed((c) => !c)}
//         aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         className={[
//           'absolute -right-3 top-[72px] z-10',
//           'w-6 h-6 rounded-full bg-slate-800 border border-white/15',
//           'flex items-center justify-center text-slate-400',
//           'hover:text-white hover:bg-slate-700 transition-colors shadow-md',
//         ].join(' ')}
//       >
//         {collapsed
//           ? <ChevronRight size={12} strokeWidth={2.5} />
//           : <ChevronLeft  size={12} strokeWidth={2.5} />
//         }
//       </button>
//     </aside>
//   )
// }

import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { DS } from '@/styles/ds'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { to: '/',            label: 'Dashboard',   icon: '⊞', end: true },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/students',    label: 'Students',    icon: '🎓' },
      { to: '/teachers',    label: 'Teachers',    icon: '👨‍🏫' },
      { to: '/guardians',   label: 'Guardians',   icon: '👪' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { to: '/subjects',    label: 'Subjects',    icon: '📚' },
      { to: '/exams',       label: 'Exams',       icon: '📝' },
      { to: '/performance', label: 'Performance', icon: '📊' },
    ],
  },
  {
    label: 'Schedule',
    items: [
      { to: '/calendar',    label: 'Calendar',    icon: '📅' },
    ],
  },
]

function NavItem({ item, collapsed }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      title={collapsed ? item.label : undefined}
      style={({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: 11,
        padding: collapsed ? '10px 0' : '10px 13px',
        marginBottom: 2, borderRadius: 10,
        textDecoration: 'none',
        justifyContent: collapsed ? 'center' : 'flex-start',
        background: isActive ? DS.primary : 'transparent',
        color: isActive ? '#fff' : DS.sidebarText,
        fontWeight: isActive ? 700 : 400,
        fontSize: 14, transition: 'all 0.15s',
        position: 'relative',
      })}
      onMouseEnter={e => { if (!e.currentTarget.style.background.includes('rgb(67')) e.currentTarget.style.background = 'rgba(99,102,241,0.14)' }}
      onMouseLeave={e => { if (!e.currentTarget.style.background.includes('rgb(67')) e.currentTarget.style.background = 'transparent' }}
    >
      {({ isActive }) => (
        <>
          <span style={{ fontSize: 16, width: 20, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
          {!collapsed && <span>{item.label}</span>}
          {isActive && !collapsed && (
            <span style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: '#c7d2fe' }} />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside style={{
      width: collapsed ? 64 : 224, minHeight: '100vh',
      background: DS.sidebar, display: 'flex', flexDirection: 'column',
      flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
      transition: 'width 0.3s ease', overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{
        padding: collapsed ? '24px 0' : '24px 20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start', gap: 11,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: DS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏫</div>
        {!collapsed && (
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 16, color: '#fff', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>EduAdmin</p>
            <p style={{ margin: 0, fontSize: 10, color: '#818cf8', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>School Manager</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: collapsed ? '14px 4px' : '14px 10px', flex: 1, overflowY: 'auto' }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {collapsed
              ? <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '10px 8px 8px' }} />
              : <p style={{ margin: '16px 0 8px 4px', fontSize: 10, fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{section.label}</p>
            }
            {section.items.map((item) => (
              <NavItem key={item.to} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)',
            background: 'transparent', cursor: 'pointer', color: DS.sidebarText,
            fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* User footer */}
      <div style={{ padding: collapsed ? '14px 0' : '14px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#818cf822', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>AD</div>
        {!collapsed && (
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#e0e7ff' }}>Admin User</p>
            <p style={{ margin: 0, fontSize: 11, color: '#6366f1' }}>System Administrator</p>
          </div>
        )}
      </div>
    </aside>
  )
}