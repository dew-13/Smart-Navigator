"use client"

import { Heart, Shield, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Emergency: 011-2635000</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>Security: 24/7</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>Made with</span>
          <Heart className="h-3 w-3 text-red-500" />
          <span>for CINEC Students</span>
        </div>
      </div>
    </footer>
  )
}
