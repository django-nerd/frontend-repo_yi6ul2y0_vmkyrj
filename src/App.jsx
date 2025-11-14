import React, { useMemo, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { BarChart2, Truck, Users } from 'lucide-react'
import Sidebar from './components/Sidebar'
import SheetPanel from './components/SheetPanel'
import DataTable from './components/DataTable'
import DesignTokens from './components/DesignTokens'
import Hero from './components/Hero'

function Dashboard() {
  const shipments = useMemo(()=>[
    { ref: 'SHP-001', customer: 'PT Nusantara Logistik', origin: 'Jakarta', destination: 'Surabaya', status: 'pending', price: 4500000 },
    { ref: 'SHP-002', customer: 'CV Maju Jaya', origin: 'Bandung', destination: 'Semarang', status: 'in_transit', price: 3800000 },
    { ref: 'SHP-003', customer: 'PT Samudra', origin: 'Medan', destination: 'Jakarta', status: 'delivered', price: 7200000 },
  ], [])
  const columns = useMemo(()=>[
    { accessorKey: 'ref', header: 'Ref' },
    { accessorKey: 'customer', header: 'Customer', meta: { editable: true } },
    { accessorKey: 'origin', header: 'Asal', meta: { editable: true } },
    { accessorKey: 'destination', header: 'Tujuan', meta: { editable: true } },
    { accessorKey: 'status', header: 'Status', cell: ({getValue})=>{
      const v = getValue()
      const map = { pending: 'bg-amber-100 text-amber-700', in_transit: 'bg-blue-100 text-blue-700', delivered: 'bg-green-100 text-green-700' }
      return <span className={`px-2 py-0.5 rounded text-xs ${map[v] || 'bg-gray-100 text-gray-700'}`}>{v}</span>
    } },
    { accessorKey: 'price', header: 'Harga', cell: ({getValue})=> new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(getValue()) },
  ], [])

  return (
    <div className="space-y-6">
      <Hero />
      <section id="demo" className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/70 backdrop-blur border">
          <div className="flex items-center gap-2 text-gray-700"><Truck className="w-4 h-4" /> Total Shipments</div>
          <div className="text-2xl font-semibold mt-1">1.284</div>
        </div>
        <div className="p-4 rounded-lg bg-white/70 backdrop-blur border">
          <div className="flex items-center gap-2 text-gray-700"><Users className="w-4 h-4" /> Customers</div>
          <div className="text-2xl font-semibold mt-1">342</div>
        </div>
        <div className="p-4 rounded-lg bg-white/70 backdrop-blur border">
          <div className="flex items-center gap-2 text-gray-700"><BarChart2 className="w-4 h-4" /> On-Time Rate</div>
          <div className="text-2xl font-semibold mt-1">96%</div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Daftar Shipments</h2>
          <div className="text-sm text-gray-600">Demo fitur tabel interaktif</div>
        </div>
        <DataTable data={shipments} columns={columns} onInlineEdit={() => toast.success('Perubahan disimpan')} />
      </section>

      <section id="components" className="space-y-3">
        <h2 className="text-xl font-semibold">Design Tokens</h2>
        <DesignTokens />
      </section>
    </div>
  )
}

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [route, setRoute] = useState('dashboard')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetFull, setSheetFull] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50">
      <Toaster position="top-right" />
      <Sidebar
        collapsed={collapsed}
        onToggle={()=>setCollapsed(v=>!v)}
        current={route}
        onNavigate={(r)=>{ setRoute(r); if (r === 'shipments') setSheetOpen(true) }}
      />

      <main className="pl-[80px] lg:pl-[280px] transition-all duration-300 px-6 py-6">
        {route === 'dashboard' && <Dashboard />}
        {route !== 'dashboard' && (
          <div className="p-6 rounded-lg bg-white/60 backdrop-blur border">
            <h1 className="text-2xl font-semibold capitalize">{route}</h1>
            <p className="text-gray-600">Halaman ini masih berupa placeholder. Buka panel di kanan untuk melihat detail.</p>
          </div>
        )}
      </main>

      <SheetPanel
        open={sheetOpen}
        onClose={()=>setSheetOpen(false)}
        title="Detail Shipment"
        icon={Truck}
        breadcrumb={["Shipments", "SHP-001"]}
        full={sheetFull}
        onToggleFull={()=>setSheetFull(v=>!v)}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded border bg-white/70">
              <div className="text-sm text-gray-600">Customer</div>
              <div className="font-medium">PT Nusantara Logistik</div>
            </div>
            <div className="p-3 rounded border bg-white/70">
              <div className="text-sm text-gray-600">Status</div>
              <div><span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700">pending</span></div>
            </div>
          </div>
          <div className="p-3 rounded border bg-white/70">
            <div className="text-sm text-gray-600">Alamat</div>
            <div>Jl. Jend. Sudirman No. 123, Jakarta</div>
          </div>
          <div className="p-3 rounded border bg-white/70">
            <div className="text-sm text-gray-600">Catatan</div>
            <div>Perlu konfirmasi jadwal pickup.</div>
          </div>
        </div>
      </SheetPanel>
    </div>
  )
}

export default App
