import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-white/30 border p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900">ERP Logistik & Freight Forwarding yang Modern</h1>
          <p className="mt-3 text-gray-700">Kelola pengiriman, pelanggan, dan dokumen dalam satu platform. Desain terinspirasi Linear & Notion, dengan performa tinggi untuk operasi harian.</p>
          <div className="mt-4 flex items-center gap-3">
            <a href="#demo" className="inline-flex h-10 items-center px-4 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors">Lihat Demo</a>
            <a href="#components" className="inline-flex h-10 items-center px-4 rounded-md border hover:bg-white/60 transition-colors">Sistem Komponen</a>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden bg-white/50 backdrop-blur border min-h-[320px]">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
