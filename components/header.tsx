"use client"

import { Map } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: '#1d1729' }}>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="CINEC Logo" style={{ height: 32, width: 'auto' }} className="mr-2 rounded" />
          <div>
            <h1 className="text-lg font-semibold text-white">Campus Navigator</h1>
            <p className="text-xs text-gray-300">CINEC Campus, Malabe</p>
          </div>
        </div>
        <div className="text-xs text-gray-300">Smart Campus Navigation Map</div>
      </div>
    </header>
  )
}
