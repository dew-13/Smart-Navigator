"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { LocationDetails } from "@/components/location-details"
import { RoutesList } from "@/components/routes-list"
import { TimetableIntegration } from "@/components/timetable-integration"
import { ParkingInfo } from "@/components/parking-info"
import { EmergencyFeatures } from "@/components/emergency-features"
import { X, ChevronRight, Users, BookOpen, Coffee, Laptop, Building, School } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeView: "map" | "details" | "routes" | "history"
  setActiveView: (view: "map" | "details" | "routes" | "history") => void
  selectedLocation: string | null
  userRole: "student" | "staff" | "visitor"
  onRoleChange: (role: "student" | "staff" | "visitor") => void
  onNavigateToLocation?: (locationId: string) => void
}

export function Sidebar({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  selectedLocation,
  userRole,
  onRoleChange,
  onNavigateToLocation,
}: SidebarProps) {
  const [accessibilityMode, setAccessibilityMode] = useState(false)

  const getLocationData = (id: string | null) => {
    if (!id) return null

    const locations = {
      gaff: {
        name: "GAFF Library",
        description: "Library, Labs & Examination Center",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Study hours",
        crowdLevel: "high",
        facilities: ["Study rooms", "Computer stations", "Printing services", "Examination center"],
      },
      storm: {
        name: "STORM Cafe",
        description: "Cafe, Restaurant & Bakery",
        openingHours: "7:00 AM - 7:00 PM",
        currentEvent: "Lunch service",
        crowdLevel: "medium",
        facilities: ["Food court", "Seating area", "Bakery", "Restaurant"],
      },
      dallan: {
        name: "DALLIAN IT Labs",
        description: "IT labs & Marine Electronics Lab",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Computer lab session",
        crowdLevel: "low",
        facilities: ["Workstations", "Printing", "Technical support", "Marine Electronics"],
      },
      zenth: {
        name: "ZENITH BUILDING - IT Lab 6",
        description: "IT labs",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Computer lab session",
        crowdLevel: "low",
        facilities: ["Workstations", "Developing", "Technical support"],
      },
      main: {
        name: "MAIN Building",
        description: "Reception, Finance & Auditorium",
        openingHours: "8:30 AM - 4:30 PM",
        currentEvent: "Administrative services",
        crowdLevel: "low",
        facilities: ["Reception", "Finance office", "Auditorium", "Student services"],
      },
      zenith: {
        name: "ZENITH Building",
        description: "6-floor academic building with classrooms and IT Lab 6",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Multi-floor classes in session",
        crowdLevel: "high",
        facilities: ["6 floors", "Classrooms", "IT Lab 6", "Elevators"],
      },
      basketballCourt: {
        name: "Basketball Court",
        description: "Outdoor basketball court for student recreation",
        openingHours: "6:00 AM - 7:00 PM",
        currentEvent: "Available for play",
        crowdLevel: "medium",
        facilities: ["Outdoor court", "Lighting", "Seating area"],
      },
      wulfrun: {
        name: "WULFRUN Faculty",
        description: "Faculty of Management, Engineering & Technology",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Engineering lectures",
        crowdLevel: "medium",
        facilities: ["Faculty offices", "Lecture halls", "Meeting rooms"],
      },
      fore: {
        name: "FORE Building",
        description: "Engine & Bridge Simulator & Liquid Cargo Simulator",
        openingHours: "8:00 AM - 5:00 PM",
        currentEvent: "Maritime simulation training",
        crowdLevel: "medium",
        facilities: ["Simulators", "Training rooms", "Maritime equipment"],
      },
      mizzen: {
        name: "MIZZEN Hostel",
        description: "Student accommodation facility",
        openingHours: "24/7",
        currentEvent: "Residential facility",
        crowdLevel: "medium",
        facilities: ["Student rooms", "Common areas", "Laundry"],
      },
      swimmingPool: {
        name: "Swimming Pool & Gymnasium",
        description: "Swimming pool, gymnasium, and laundry facilities",
        openingHours: "6:00 AM - 7:00 PM",
        currentEvent: "Swimming practice",
        crowdLevel: "low",
        facilities: ["Swimming pool", "Gymnasium", "Changing rooms", "Laundry"],
      },
    }

    return locations[id as keyof typeof locations]
  }

  const getSavedRoutes = () => {
    const routes = {
      student: [
        { id: 1, name: "Morning Classes Route", path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], saved: true },
        { id: 2, name: "Lunch Break Path", path: ["ZENITH Building", "Cafe 2"], saved: true },
        { id: 3, name: "Study Session", path: ["STORM Cafe", "GAFF Library"], saved: true },
        { id: 4, name: "Basketball Practices", path: ["MIZZEN Hostel", "Basketball Court"], saved: true },
      ],
      staff: [
        { id: 1, name: "Office Route", path: ["Staff Parking", "WULFRUNA Faculty"], saved: true },
        { id: 2, name: "Lecture Path", path: ["WULFRUN Faculty", "ZENITH Building"], saved: true },
      ],
      visitor: [
        { id: 1, name: "Campus Tour", path: ["Visitor Center", "MAIN Building"], saved: true },
      ],
    }

    return routes[userRole]
  }

  const getRouteHistory = () => {
    const history = {
      student: [
        { id: 1, date: "May 20, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "9:30 AM" },
        { id: 2, date: "May 19, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "12:15 PM" },
        { id: 3, date: "May 18, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "2:45 PM" },
        { id: 4, date: "May 17, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "6:20 PM" },
      ],
      staff: [
        { id: 1, date: "May 20, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "8:15 AM" },
        { id: 2, date: "May 19, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "10:30 AM" },
        { id: 3, date: "May 18, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "1:00 PM" },
      ],
      visitor: [
        { id: 1, date: "May 20, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "10:00 AM" },
        { id: 2, date: "May 20, 2025",  path: ["Side Gate", "Dalian", "Wulfruna", "ZENITH Building"], time: "11:30 AM" },
      ],
    }

    return history[userRole]
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-80 transform bg-background shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:z-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } pt-16`}
    >
      <div className="flex items-center justify-end border-b p-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="explore" className="h-[calc(100%-64px)]">
        <TabsList className="grid w-[304] grid-cols-4 p-1 mx-4 mt-4">
          <TabsTrigger value="explore" onClick={() => setActiveView("map")}>Explore</TabsTrigger>
          <TabsTrigger value="routes" onClick={() => setActiveView("routes")}>Routes</TabsTrigger>
          <TabsTrigger value="parking">Parking</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="h-full">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">Quick Access</h3>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => onNavigateToLocation?.("gaff")}> <BookOpen className="h-5 w-5" /><span className="text-xs">Library</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => onNavigateToLocation?.("storm")}> <Coffee className="h-5 w-5" /><span className="text-xs">Cafeteria</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => { onNavigateToLocation?.("dallan"); onNavigateToLocation?.("zenth") }}><Laptop className="h-5 w-5" /><span className="text-xs">Labs</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => onNavigateToLocation?.("main")}> <Building className="h-5 w-5" /><span className="text-xs">Admin</span></Button>
                </div>
              </div>

              {selectedLocation ? (
                <LocationDetails location={getLocationData(selectedLocation)} locationId={selectedLocation} />
              ) : (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-900">Welcome to CINEC Campus</CardTitle>
                    <CardDescription className="text-gray-700">Select a location on the map to view details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToLocation?.("zenith")}> <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"> <School className="h-4 w-4 text-primary" /> </div><div><p className="text-sm font-medium text-gray-900">Faculty of Computing</p><p className="text-xs text-gray-600">Software Engineering Department</p></div><Button variant="ghost" size="icon" className="ml-auto"><ChevronRight className="h-4 w-4" /></Button></div>
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToLocation?.("gaff")}> <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"> <Users className="h-4 w-4 text-primary" /> </div><div><p className="text-sm font-medium text-gray-900">Crowd Levels</p><p className="text-xs text-gray-600">ZENITH Building is currently busy</p></div><Button variant="ghost" size="icon" className="ml-auto"><ChevronRight className="h-4 w-4" /></Button></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">Accessibility Options</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="accessibility-mode" className="text-gray-900">Accessibility Mode</Label>
                        <p className="text-xs text-gray-600">Show wheelchair routes and ramps</p>
                      </div>
                      <Switch id="accessibility-mode" checked={accessibilityMode} onCheckedChange={setAccessibilityMode} />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Elevators</Badge>
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Ramps</Badge>
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Quiet Zones</Badge>
                      </div>
                      <Input placeholder="Search accessibility features..." className="h-8 text-xs" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="routes" className="h-full">
          <ScrollArea className="h-full">
            <div className="p-4">
              <RoutesList routes={getSavedRoutes()} userRole={userRole} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="parking" className="h-full">
          <ScrollArea className="h-full">
            <div className="p-4">
              <ParkingInfo onNavigateToParking={onNavigateToLocation || (() => {})} />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="emergency" className="h-full">
          <ScrollArea className="h-full">
            <div className="p-4">
              <EmergencyFeatures currentLocation={selectedLocation || undefined} onNavigateToEmergency={onNavigateToLocation || (() => {})} />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
