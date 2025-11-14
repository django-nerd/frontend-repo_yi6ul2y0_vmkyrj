import React, { useState } from 'react'
import { Home, Package, Users, Truck, FileText, BarChart2, Settings, Search } from 'lucide-react'
import clsx from 'clsx'

export default function Sidebar({ collapsed, onToggle, current, onNavigate }) {
  const [q, setQ] = useState('')
  const items = [
    { key: 'dashboard', icon: Home, label: 'Dashboard' },
    { key: 'shipments', icon: Truck, label: 'Shipments' },
    { key: 'customers', icon: Users, label: 'Customers' },
    { key: 'documents', icon: FileText, label: 'Documents' },
    { key: 'reports', icon: BarChart2, label: 'Reports' },
    { key: 'products', icon: Package, label: 'Products' },
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]

  const sizeExpanded = 280
  const sizeCollapsed = 80

  return (
    <aside
      className={clsx(
        'h-screen border-r bg-white/70 backdrop-blur fixed left-0 top-0 z-30 transition-all duration-300',
      )}
      style={{ width: collapsed ? sizeCollapsed : sizeExpanded }}
    >
      <div className="flex items-center gap-2 px-4 h-16">
        <div className="w-8 h-8 rounded-md bg-teal-600" />
        {!collapsed && <div className="font-semibold">LogiFlow</div>}
      </div>

      <div className="px-3">
        <div className={clsx('flex items-center gap-2 p-2 rounded-md bg-gray-100', collapsed && 'opacity-0 pointer-events-none')}>
          <Search className="w-4 h-4 text-gray-500" />
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Cari cepat (Cmd+K)" aria-label="Quick search"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </div>

      <nav className="mt-3 px-2 space-y-1">
        {items.filter(i=>i.label.toLowerCase().includes(q.toLowerCase())).map((item)=>{
          const Icon = item.icon
          const active = current === item.key
          return (
            <button
              key={item.key}
              onClick={()=>onNavigate(item.key)}
              className={clsx('w-full flex items-center gap-3 px-3 h-10 rounded-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
                active ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-600' : 'hover:bg-gray-100 text-gray-700')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className={clsx('p-3 rounded-lg bg-white/70 backdrop-blur border text-sm', collapsed && 'opacity-0 pointer-events-none')}>
          <div className="font-medium">Akun</div>
          <div className="text-gray-600">admin@logiflow.co</div>
        </div>
        <button
          onClick={onToggle}
          className="mt-2 w-full text-gray-600 hover:text-gray-900 text-sm"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '›› Perluas' : '‹‹ Runtuhkan'}
        </button>
      </div>
    </aside>
  )
}
