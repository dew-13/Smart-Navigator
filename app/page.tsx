"use client"

import { useState, useEffect } from "react"
import { MapContainer } from "@/components/map-container"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useCrowdData } from "@/hooks/use-crowd-data"

export default function SmartCampusNavigator() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<"map" | "details" | "routes" | "history">("map")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<"student" | "staff" | "visitor">("student")
  const [, setSavedRoutes] = useState<Array<{
    id: string
    from: string
    to: string
    path: string[]
    name: string
    timestamp: number
  }>>([])
  const [routeFrom, setRouteFrom] = useState<string | null>(null)
  const [routeTo, setRouteTo] = useState<string | null>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { toast } = useToast()
  const { crowdUpdates } = useCrowdData()

  // Load saved routes from localStorage on mount
  useEffect(() => {
    const savedRoutesFromStorage = localStorage.getItem('savedRoutes')
    if (savedRoutesFromStorage) {
      setSavedRoutes(JSON.parse(savedRoutesFromStorage))
    }
  }, [])

  // Handle new route save
  const handleSaveRoute = (route: {
    id: string
    from: string
    to: string
    path: string[]
    name: string
    timestamp: number
  }) => {
    setSavedRoutes(prev => [...prev, route])
    toast({
      title: "Route Saved",
      description: `Route '${route.name}' has been saved`,
      duration: 3000,
    })
  }

  const handleDeleteRoute = (id: string | number) => {
    setSavedRoutes(prev => prev.filter(route => route.id !== id))
  }

  // Auto-open sidebar on desktop
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true)
    } else {
      setSidebarOpen(false)
    }
  }, [isDesktop])

  // Show toast notifications for crowd updates
  useEffect(() => {
    if (crowdUpdates.length > 0) {
      const latestUpdate = crowdUpdates[0]

      toast({
        title: "Crowd Update",
        description: `${latestUpdate.location} is now ${latestUpdate.level} (was ${latestUpdate.previous})`,
        duration: 5000,
      })
    }
  }, [crowdUpdates, toast])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Header */}
      <Header />

      {/* Mobile Navigation */}
      <div className="fixed top-16 left-0 right-0 z-50 lg:hidden">
        <MobileNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} userRole={userRole} onRoleChange={setUserRole} />
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
        selectedLocation={selectedLocation}
        userRole={userRole}
        onRoleChange={setUserRole}
        onNavigateToLocation={setSelectedLocation}

        routeFrom={routeFrom}
        routeTo={routeTo}
        setRouteFrom={setRouteFrom}
        setRouteTo={setRouteTo}
        onDeleteRoute={handleDeleteRoute} savedRoutes={[]}      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden pt-16 pb-12">
        {/* Desktop Search and User Menu */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:p-4 lg:absolute lg:top-16 lg:right-0 lg:left-0 lg:z-10">
          <SearchBar onLocationSelect={setSelectedLocation} />
          <UserMenu userRole={userRole} onRoleChange={setUserRole} />
        </div>

        {/* Map Container */}
        <MapContainer 
          selectedLocation={selectedLocation} 
          userRole={userRole} 
          activeView={activeView}
          onSaveRoute={handleSaveRoute}
          routeFromProp={routeFrom}
          routeToProp={routeTo}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}
