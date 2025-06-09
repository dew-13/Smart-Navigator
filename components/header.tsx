"use client"

import { Map } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Map className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Campus Navigator</h1>
            <p className="text-xs text-gray-600">CINEC Campus, Malabe</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">Smart Campus Navigation System</div>
      </div>
    </header>
  )
}
