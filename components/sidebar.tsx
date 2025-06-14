"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { LocationDetails } from "@/components/location-details"
import { RoutesList } from "@/components/routes-list"
import { ParkingInfo } from "@/components/parking-info"
import { EmergencyFeatures } from "@/components/emergency-features"
import { X, ChevronRight, Users, BookOpen, Coffee, Laptop, Building, School } from "lucide-react"
import { MapContainer } from "@/components/map-container"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeView: "map" | "details" | "routes" | "history"
  setActiveView: (view: "map" | "details" | "routes" | "history") => void
  selectedLocation: string | null
  userRole: "student" | "staff" | "visitor"
  onRoleChange: (role: "student" | "staff" | "visitor") => void
  onNavigateToLocation?: (locationId: string) => void
  routeFrom: string | null
  routeTo: string | null
  setRouteFrom: (id: string | null) => void
  setRouteTo: (id: string | null) => void
  savedRoutes: never[]
  onDeleteRoute?: (id: string | number) => void
}

export function Sidebar({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  selectedLocation,
  userRole,

  onNavigateToLocation,
  routeFrom,
  routeTo,
  setRouteFrom,
  setRouteTo,
  savedRoutes,
  onDeleteRoute,
}: SidebarProps) {

  const [quickAccessList, setQuickAccessList] = useState<string[]>([])
  const [quickAccessTitle, setQuickAccessTitle] = useState<string>("")

  

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
      dalian: {
        name: "DALIAN IT Labs",
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
      wulfruna: {
        name: "WULFRUNA Faculty",
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
      cafe2: {
        name: "Cafe 2",
        description: "Additional dining, snacks, and beverages",
        openingHours: "7:30 AM - 6:00 PM",
        currentEvent: "Snack break",
        crowdLevel: "medium",
        facilities: ["Snacks", "Beverages", "Seating area", "Quick bites"],
      },
    }

    return locations[id as keyof typeof locations]
  }


  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-80 max-w-full transform bg-background shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:z-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } pt-16`}
      style={{ boxSizing: "border-box", paddingRight: "12px" }}
    >
      <div className="flex items-center justify-end border-b p-4 pr-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="explore" className="h-[calc(100%-64px)]">
        <TabsList className="grid w-[304px] grid-cols-4 p-1 mx-4 mt-4">
          <TabsTrigger value="explore" onClick={() => setActiveView("map")}>Explore</TabsTrigger>
          <TabsTrigger value="routes" onClick={() => setActiveView("routes")}>Routes</TabsTrigger>
          <TabsTrigger value="parking">Parking</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="h-full">
          <ScrollArea className="h-full pr-2">
            <div className="p-2 pb-8">
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900">Quick Access</h3>
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => { setQuickAccessList([]); setQuickAccessTitle(""); onNavigateToLocation?.("gaff") }}> <BookOpen className="h-5 w-5" /><span className="text-xs">Library</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => { setQuickAccessList(["storm", "cafe2"]); setQuickAccessTitle("Cafeteria Locations"); }}> <Coffee className="h-5 w-5" /><span className="text-xs">Cafeteria</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => { setQuickAccessList(["zenith", "wulfruna", "dalian", "gaff"]); setQuickAccessTitle("Lab Locations"); }}> <Laptop className="h-5 w-5" /><span className="text-xs">Labs</span></Button>
                  <Button variant="outline" className="flex h-auto flex-col items-center gap-1 p-2 text-gray-900" onClick={() => { setQuickAccessList([]); setQuickAccessTitle(""); onNavigateToLocation?.("main") }}> <Building className="h-5 w-5" /><span className="text-xs">Admin</span></Button>
                </div>
                {quickAccessList.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1">{quickAccessTitle}</h4>
                    {quickAccessList.map(locId => (
                      <Button key={locId} variant="secondary" className="justify-start" onClick={() => { onNavigateToLocation?.(locId); setQuickAccessList([]); setQuickAccessTitle(""); }}>
                        {getLocationData(locId)?.name || locId}
                      </Button>
                    ))}
                  </div>
                )}
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
                     
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 h-6">
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Elevators</Badge>
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Ramps</Badge>
                        <Badge variant="outline" className="bg-primary/10 text-gray-900">Quiet Zones</Badge>
                      </div>
                      <br/>
                    </div>

                    {/* Accessibility Buildings List */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full mr-2"><School className="h-4 w-4 text-blue-700" /></span>
                          Zenith
                        </div>
                        <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700">Elevator</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full mr-2"><School className="h-4 w-4 text-green-700" /></span>
                          Wulfruna
                        </div>
                        <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700">Elevator</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full mr-2"><BookOpen className="h-4 w-4 text-purple-700" /></span>
                          Gaff
                        </div>
                        <span className="px-2 py-0.5 text-xs rounded bg-purple-50 text-purple-700">Quiet Zone</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full mr-2"><Building className="h-4 w-4 text-yellow-700" /></span>
                          Main
                        </div>
                        <span className="px-2 py-0.5 text-xs rounded bg-purple-50 text-purple-700">Quiet Zone</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-100 rounded-full mr-2"><Users className="h-4 w-4 text-pink-700" /></span>
                          Student Registration
                        </div>
                        <span className="px-2 py-0.5 text-xs rounded bg-purple-50 text-purple-700">Quiet Zone</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="routes" className="h-full">
          <ScrollArea className="h-full pr-2">
            <div className="p-4 pb-8">
              <RoutesList 
                routes={savedRoutes} 
                userRole={userRole} 
                fromValue={routeFrom || ""}
                toValue={routeTo || ""}
                onFromChange={setRouteFrom}
                onToChange={setRouteTo}
                onLocationSelect={(locationId, field) => {
                  if (field === "from") setRouteFrom(locationId)
                  if (field === "to") setRouteTo(locationId)
                  onNavigateToLocation?.(locationId);
                  setActiveView("routes");
                }}
                onFindRoute={(from, to) => {
                  setRouteFrom(from)
                  setRouteTo(to)
                  onNavigateToLocation?.(from);
                  onNavigateToLocation?.(to);
                  setActiveView("routes");
                }}
                onClearRoute={() => {
                  setRouteFrom(null);
                  setRouteTo(null);
                }}
                onDeleteRoute={onDeleteRoute}
              />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="parking" className="h-full">
          <ScrollArea className="h-full pr-2">
            <div className="p-4 pb-8">
              <ParkingInfo
                onNavigateToParking={(parkingId) => {
                  if (parkingId === "studentParking" || parkingId === "visitorParking") {
                    onNavigateToLocation?.("carPark");
                  } else if (parkingId === "staffParking") {
                    onNavigateToLocation?.("wulfruna");
                  } else if (parkingId === "motorcycleParking") {
                    onNavigateToLocation?.("motorcycleParking");
                  } else {
                    onNavigateToLocation?.(parkingId);
                  }
                }}
              />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="emergency" className="h-full">
          <ScrollArea className="h-full pr-2">
            <div className="p-4 pb-8">
              <EmergencyFeatures
                currentLocation={selectedLocation || undefined}
                onNavigateToEmergency={(locationId) => {
                  if (locationId === "fireTraining" || locationId === "swimmingPool") {
                    onNavigateToLocation?.("carPark");
                  } else {
                    onNavigateToLocation?.(locationId);
                  }
                }}
              />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <MapContainer
        selectedLocation={selectedLocation}
        userRole={userRole}
        activeView={activeView}
        routeFromProp={routeFrom}
        routeToProp={routeTo}
      />
    </div>
  )
}
