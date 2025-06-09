"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Map,
  Navigation2,
  Users,
  Clock,
  Calendar,
  Droplets,
  ShipWheelIcon as Wheelchair,
  Share2,
  Info,
  Layers,
  Route,
} from "lucide-react"
import { useCrowdData } from "@/hooks/use-crowd-data"
import { CrowdLevelIndicator } from "@/components/crowd-level-indicator"

interface MapContainerProps {
  selectedLocation: string | null
  userRole: "student" | "staff" | "visitor"
  activeView: "map" | "details" | "routes" | "history"
}

interface Location {
  id: string
  name: string
  x: number
  y: number
  description: string
  openingHours: string
  currentEvent: string
  category: string
  connections?: string[]
  floors?: Array<{
    floor: number
    description: string
    capacity: number
  }>
}

export function MapContainer({ selectedLocation, userRole, activeView }: MapContainerProps) {
  const [isLoading, setIsLoading] = useState(true)
  // const [weatherCondition, setWeatherCondition] = useState<"sunny" | "rainy" | "cloudy">("sunny")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("morning")
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showRoutes, setShowRoutes] = useState(false)
  const [routeFrom, setRouteFrom] = useState<string | null>(null)
  const [routeTo, setRouteTo] = useState<string | null>(null)
  const [optimizedRoute, setOptimizedRoute] = useState<string[] | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapZoom, setMapZoom] = useState(1)

  // Get crowd data from our hook
  const { crowdData, crowdUpdates } = useCrowdData()

  // Simulate loading the map
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate time of day changes for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      const options = ["morning", "afternoon", "evening"] as const
      const randomIndex = Math.floor(Math.random() * options.length)
      setTimeOfDay(options[randomIndex])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Simulate weather changes for demo purposes
  /* useEffect(() => {
    const interval = setInterval(() => {
      const options = ["sunny", "rainy", "cloudy"] as const
      const randomIndex = Math.floor(Math.random() * options.length)
      setWeatherCondition(options[randomIndex])
    }, 60000)

    return () => clearInterval(interval)
  }, []) */

  // Updated CINEC Campus locations with new buildings
const locations: Location[] = [
  { id: "mainEntrance", name: "Main Entrance", x: 28, y: 85, description: "Main gate access", openingHours: "24/7", currentEvent: "", category: "Access", connections: ["carPark", "fore", "main", "dalian"] },
  { id: "subEntrance", name: "Small Entrance", x: 48, y: 85, description: "Sub gate access", openingHours: "24/7", currentEvent: "", category: "Access", connections: ["carPark", "main", "dalian"] },
  { id: "carPark", name: "Car Park", x: 45, y: 95, description: "Parking for staff/students", openingHours: "24/7", currentEvent: "", category: "Facilities", connections: ["mainEntrance", "subEntrance"] },
  { id: "studentRegistration", name: "Student Registration", x: 40, y: 60, description: "Student admission and services", openingHours: "8:00 - 16:00", currentEvent: "Registration", category: "Administrative", connections: ["main", "hanger", "storm", "fore", "basketballCourt", "gaff"] },
  { id: "main", name: "MAIN", x: 40, y: 68, description: "Reception – Finance – Auditorium", openingHours: "8:00 - 16:30", currentEvent: "Admin services", category: "Administrative", connections: ["studentRegistration", "dalian", "spencer", "storm", "fore", "subEntrance", "mainEntrance"] },
  { id: "hanger", name: "HANGER", x: 42, y: 5, description: "Aviation Workshop – Automobile Workshops", openingHours: "9:00 - 16:00", currentEvent: "Training", category: "Workshop", connections: ["volleyballCourt", "hullock", "mizzen"] },
  { id: "workshop", name: "Workshop", x: 60, y: 20, description: "Welding & mechanical labs", openingHours: "9:00 - 16:00", currentEvent: "Practice", category: "Workshop", connections: ["cafe2", "hullock", "gaff", "facultyAviation", "studentArea", "top", "bookshop"] },
  { id: "storm", name: "STORM", x: 15, y: 40, description: "Café / Restaurant / Bakery", openingHours: "7:00 - 20:00", currentEvent: "Lunch rush", category: "Dining", connections: ["main", "fore", "mizzen", "hanger", "studentRegistration", "basketballCourt", "swimmingPool"] },
  { id: "fore", name: "FORE", x: 12, y: 60, description: "Engine & Bridge Simulator & Liquid Cargo Simulator", openingHours: "9:00 - 16:00", currentEvent: "Simulator session", category: "Maritime", connections: ["storm", "mizzen", "mainEntrance", "basketballCourt", "swimmingPool", "studentRegistration", "main"] },
  { id: "mizzen", name: "MIZZEN", x: 30, y: 10, description: "Hostel", openingHours: "24/7", currentEvent: "Residential", category: "Accommodation", connections: ["storm", "fore", "basketballCourt", "volleyballCourt", "hanger"] },
  { id: "basketballCourt", name: "Basketball Court", x: 37, y: 45, description: "Outdoor court", openingHours: "6:00 - 18:00", currentEvent: "", category: "Recreation", connections: ["mizzen", "volleyballCourt", "gaff", "storm", "fore", "studentRegistration"] },
  { id: "swimmingPool", name: "Swimming Pool", x: 5, y: 45, description: "Swimming pool – Gymnasium – Laundry", openingHours: "6:00 - 18:00", currentEvent: "", category: "Recreation", connections: ["storm", "mainEntrance", "fore"] },
  { id: "volleyballCourt", name: "Volleyball Court", x: 43, y: 25, description: "Open volleyball space", openingHours: "6:00 - 18:00", currentEvent: "", category: "Recreation", connections: ["basketballCourt", "hanger", "mizzen"] },
  { id: "hullock", name: "HULLOCK", x: 52, y: 10, description: "Welding Workshop – Machine Shop – Engine Fitting Shops – Fitting Shop – Seaman Center – Drawing / Chart Room", openingHours: "8:00 - 16:00", currentEvent: "Training", category: "Workshop", connections: ["hanger", "gaff", "top", "cafe2", "workshop"] },
  { id: "gaff", name: "GAFF", x: 52, y: 40, description: "Library – Generator Room – Electrical Workshop – Control Lab – High Voltage Lab – Electro – Pneumatic – Hydraulic Lab – Examination Center", openingHours: "9:00 - 17:00", currentEvent: "Quiet study", category: "Academic", connections: ["studentRegistration", "hullock", "top", "sky", "basketballCourt", "workshop"] },
  { id: "bookshop", name: "Bookshop", x: 68, y: 44, description: "Bookshop with stationery and photocopy, Printout, etc.", openingHours: "9:00 - 16:00", currentEvent: "Lectures", category: "Academic", connections: ["gaff", "top", "workshop", "cafe2", "studentArea", "studentCommon"] },
  { id: "top", name: "TOP", x: 65, y: 44, description: "Office of Faculty of Marine Engineering – Faculty of Maritime Science Department of Safety & Survival Training – Printing Room", openingHours: "9:00 - 16:00", currentEvent: "Lectures", category: "Academic", connections: ["gaff", "bookshop", "sky", "workshop", "cafe2", "studentArea"] },
  { id: "sky", name: "Sky", x: 61, y: 54, description: "Class Rooms", openingHours: "8:00 - 17:00", currentEvent: "Class in session", category: "Academic", connections: ["top", "spencer", "gaff"] },
  { id: "spencer", name: "Spencer", x: 61, y: 64, description: "Class Room", openingHours: "8:00 - 17:00", currentEvent: "Lecture", category: "Academic", connections: ["sky", "dalian", "main", "wulfruna"] },
  { id: "dalian", name: "Dalian", x: 61, y: 75, description: "IT labs – Marine Electronics & Radio Communication LAB", openingHours: "8:00 - 17:00", currentEvent: "Lab session", category: "Technology", connections: ["spencer", "subEntrance", "wulfruna", "main"] },
  { id: "zenith", name: "Zenith", x: 91, y: 10, description: "Lecture Halls for Faculty of Management & Social Science, Faculty of Engineering & Technology,  and IT Lab 6", openingHours: "8:00 - 17:00", currentEvent: "Class ongoing", category: "Academic", floors: [{ floor: 1, description: "Classrooms", capacity: 150 }, { floor: 6, description: "IT Lab", capacity: 80 }], connections: ["yogaHut", "shipInCampus", "studentCommon", "cafe2", "dalian", "wulfruna"] },
  { id: "wulfruna", name: "Wulfruna", x: 81, y: 60, description: "Faculty of Management & Social Science, Faculty of Engineering & Technology, Civil Engineering Lab, Mechanical – Thermodynamic and Fluid Lab, Basic Electronic Lab, Engineering Simulation Lab, Communication Engineering Lab, Micro Electronic Lab, CINEC/Orange Research Center, CINEC/MAS Research Hub", openingHours: "8:00 - 17:00", currentEvent: "Class ongoing", category: "Academic", floors: [{ floor: 4, description: "Classrooms", capacity: 150 }, ], connections: ["dalian", "zenith", "studentCommon"] },
  { id: "cafe2", name: "Cafe 2", x: 65, y: 4, description: "Additional dining", openingHours: "7:30 - 18:00", currentEvent: "Snack break", category: "Dining", connections: ["workshop", "yogaHut", "facultyAviation"] },
  { id: "studentArea", name: "Student Area", x: 73, y: 23, description: "Recreation zone", openingHours: "24/7", currentEvent: "Group activities", category: "Student Life", connections: ["cafe2", "studentCommon", "facultyAviation", "workshop", "yogaHut"] },
  { id: "studentCommon", name: "Student Common Faculty", x: 79, y: 25, description: "Student common spaces", openingHours: "24/7", currentEvent: "Relaxation", category: "Student Life", connections: ["studentArea", "yogaHut", "zenith", "wulfruna", "bookshop"] },
  { id: "yogaHut", name: "Yoga – Hut", x: 79, y: 8, description: "Wellness & meditation", openingHours: "6:00 - 18:00", currentEvent: "Yoga session", category: "Wellness", connections: ["studentArea", "facultyAviation", "zenith", "cafe2"] },
  { id: "facultyAviation", name: "Faculty of Aviation", x: 73, y: 13, description: "Aviation classes", openingHours: "8:00 - 16:00", currentEvent: "Training", category: "Academic", connections: ["studentArea", "workshop", "cafe2", "yogaHut"] },
  { id: "shipInCampus", name: "Ship-in-campus", x: 98, y: 5, description: "Training ship for marine studies", openingHours: "8:00 - 17:00", currentEvent: "Hands-on training", category: "Maritime", connections: ["zenith"] }
];



  // Route optimization algorithm using Dijkstra's algorithm
  const findOptimalRoute = (from: string, to: string): string[] | null => {
    if (!from || !to || from === to) return null

    const graph: Record<string, Record<string, number>> = {}

    // Build adjacency graph with distances
    locations.forEach((location) => {
      graph[location.id] = {}
      location.connections?.forEach((connectedId) => {
        const connectedLocation = locations.find((l) => l.id === connectedId)
        if (connectedLocation) {
          // Calculate Euclidean distance
          const distance = Math.sqrt(
            Math.pow(location.x - connectedLocation.x, 2) + Math.pow(location.y - connectedLocation.y, 2),
          )
          graph[location.id][connectedId] = distance
        }
      })
    })

    // Dijkstra's algorithm
    const distances: Record<string, number> = {}
    const previous: Record<string, string | null> = {}
    const unvisited = new Set<string>()

    // Initialize
    locations.forEach((location) => {
      distances[location.id] = location.id === from ? 0 : Number.POSITIVE_INFINITY
      previous[location.id] = null
      unvisited.add(location.id)
    })

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      const current = Array.from(unvisited).reduce((min, node) => (distances[node] < distances[min] ? node : min))

      if (distances[current] === Number.POSITIVE_INFINITY) break
      if (current === to) break

      unvisited.delete(current)

      // Update distances to neighbors
      Object.keys(graph[current] || {}).forEach((neighbor) => {
        if (unvisited.has(neighbor)) {
          const alt = distances[current] + graph[current][neighbor]
          if (alt < distances[neighbor]) {
            distances[neighbor] = alt
            previous[neighbor] = current
          }
        }
      })
    }

    // Reconstruct path
    const path: string[] = []
    let current: string | null = to
    while (current !== null) {
      path.unshift(current)
      current = previous[current]
    }

    return path.length > 1 && path[0] === from ? path : null
  }

  // Get crowd level color
  const getCrowdLevelColor = (locationId: string): string => {
    const level = crowdData[locationId]?.level || "low"
    switch (level) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get smart route recommendation based on context
  const getSmartRecommendation = (): string => {
    /* if (weatherCondition === "rainy") {
      return "Indoor routes recommended due to rain. Consider MAIN building or GAFF Library"
    } */

    if (timeOfDay === "evening") {
      return "Well-lit paths recommended for evening travel. MAIN building area is well-lit"
    }

    if (selectedLocation === "gaff" && crowdData["gaff"]?.level === "high") {
      return "GAFF Library is crowded. Consider ZENITH Building Floor 6 IT Lab for computer work"
    }

    if (timeOfDay === "afternoon" && selectedLocation === "storm") {
      return "STORM Cafe is busy during lunch. Try the Basketball Court for a break"
    }

    if (optimizedRoute && optimizedRoute.length > 2) {
      const routeNames = optimizedRoute.map((id) => locations.find((l) => l.id === id)?.name || id).join(" → ")
      return `Optimal route: ${routeNames}`
    }

    return "Fastest route shown based on current conditions"
  }

  // Zoom in and out functions
  const zoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const zoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.8))
  }

  // Handle location click for route planning
  const handleLocationClick = (locationId: string) => {
    if (!routeFrom) {
      setRouteFrom(locationId)
    } else if (!routeTo && locationId !== routeFrom) {
      setRouteTo(locationId)
      const route = findOptimalRoute(routeFrom, locationId)
      setOptimizedRoute(route)
    } else {
      // Reset route planning
      setRouteFrom(locationId)
      setRouteTo(null)
      setOptimizedRoute(null)
    }
  }

  return (
    <div className="relative h-full w-full">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading CINEC campus map...</p>
          </div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          {/* Plain colored background - removed all decorative elements */}
          <div
            ref={mapRef}
              className="relative h-full w-full overflow-hidden"
              style={{
                backgroundImage: "url('/cinec-campus-map.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `scale(${mapZoom})`,
                transformOrigin: "center",
              }}
                      >
            {/* Only show optimized route when planning */}
            {optimizedRoute && optimizedRoute.length > 1 && (
              <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
                <g>
                  {optimizedRoute.slice(0, -1).map((locationId, index) => {
                    const currentLoc = locations.find((l) => l.id === locationId)
                    const nextLoc = locations.find((l) => l.id === optimizedRoute[index + 1])
                    if (!currentLoc || !nextLoc) return null

                    return (
                      <line
                        key={`route-${index}`}
                        x1={`${currentLoc.x}%`}
                        y1={`${currentLoc.y}%`}
                        x2={`${nextLoc.x}%`}
                        y2={`${nextLoc.y}%`}
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray="8,4"
                        markerEnd="url(#arrowhead)"
                      />
                    )
                  })}
                  {/* Arrow marker definition */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                  </defs>
                </g>
              </svg>
            )}

            {/* Heatmap overlay */}
            {showHeatmap && (
              <div
                className="absolute inset-0 bg-gradient-radial from-red-500/20 via-yellow-500/10 to-transparent"
                style={{
                  backgroundSize: "50% 50%",
                  backgroundPosition: "45% 40%, 75% 50%, 85% 45%",
                  backgroundRepeat: "no-repeat",
                  mixBlendMode: "multiply",
                  zIndex: 2,
                }}
              ></div>
            )}

            {/* Building Markers */}
            {locations.map((location) => (
              <TooltipProvider key={location.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedLocation === location.id ? "default" : "outline"}
                      size="icon"
                      className={`absolute h-10 w-10 rounded-full bg-white hover:bg-white shadow-lg border-2 border-blue-500 ${
                        selectedLocation === location.id ? "ring-4 ring-primary ring-offset-2" : ""
                      } ${routeFrom === location.id ? "ring-4 ring-green-500 ring-offset-2" : ""} ${
                        routeTo === location.id ? "ring-4 ring-red-500 ring-offset-2" : ""
                      }`}
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: `translate(-50%, -50%)`,
                        zIndex: selectedLocation === location.id ? 20 : 10,
                      }}
                      onClick={() => handleLocationClick(location.id)}
                    >
                      <span
                        className={`absolute right-0 top-0 h-3 w-3 rounded-full border border-white ${getCrowdLevelColor(location.id)}`}
                      ></span>
                      <Map className="h-5 w-5 text-gray-600" />
                      {location.id === "zenith" && (
                        <span className="absolute -bottom-1 -right-1 text-xs font-bold text-primary bg-white rounded-full w-4 h-4 flex items-center justify-center">
                          6
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs max-w-[250px] group">
                      <p className="font-medium text-black">{location.name}</p><br/>
                      <p className="text-gray-600">{location.description}</p>
                      {location.floors && (
                        <div className="mt-2">
                          <p className="font-medium">Floors:</p>
                          {location.floors.map((floor) => (
                            <p key={floor.floor} className="text-xs">
                              Floor {floor.floor}: {floor.description} ({floor.capacity} capacity)
                            </p>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-1 mt-1">
                        <CrowdLevelIndicator level={crowdData[location.id]?.level || "low"} />
                        <span className="text-black group-hover:text-black transition-colors">
                          {crowdData[location.id]?.count || Math.floor(Math.random() * 50)} people
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-gray-900"><br/>
                        <span className="font-medium">Now: </span>
                        {location.currentEvent}
                      </p>
                      {routeFrom && !routeTo && location.id !== routeFrom && (
                        <p className="text-xs mt-1 text-gray-700 font-medium">Click to set as destination</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Context Indicators - Lower z-index */}
          {/* <div className="absolute left-4 top-20 flex flex-col gap-2 z-20">
            <Badge variant="outline" className="bg-white/90 px-2 py-1 shadow-md">
              <Clock className="mr-1 h-3 w-3" />
              <span className="text-xs">{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</span>
            </Badge>
            <Badge variant="outline" className="bg-white/90 px-2 py-1 shadow-md">
              <Droplets className="mr-1 h-3 w-3" />
              <span className="text-xs">{weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1)}</span>
            </Badge>
            <Badge variant="outline" className="bg-white/90 px-2 py-1 shadow-md">
              <Calendar className="mr-1 h-3 w-3" />
              <span className="text-xs">Weekday</span>
            </Badge>
          </div> */}

          {/* Route Planning Panel - Higher z-index to appear on top */}
          {(routeFrom || routeTo) && (
            <Card className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm shadow-lg z-50 min-w-[250px] border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Route className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm text-gray-900">Route Planning</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-900">
                    From: {routeFrom ? locations.find((l) => l.id === routeFrom)?.name : "Select start"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-900">
                    To: {routeTo ? locations.find((l) => l.id === routeTo)?.name : "Select destination"}
                  </span>
                </div>
                {optimizedRoute && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="font-medium text-gray-900">Optimal Route ({optimizedRoute.length - 1} stops):</p>
                    <p className="text-xs text-gray-700">
                      {optimizedRoute.map((id) => locations.find((l) => l.id === id)?.name || id).join(" → ")}
                    </p>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRouteFrom(null)
                    setRouteTo(null)
                    setOptimizedRoute(null)
                  }}
                  className="w-full mt-2"
                >
                  Clear Route
                </Button>
              </div>
            </Card>
          )}

          {/* Context-aware recommendation */}
          <Card className="absolute bottom-5 left-4 right-4 p-3 md:left-auto md:right-4 md:w-80 z-30 bg-white/95 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Smart Recommendation</p>
                <p className="text-xs text-gray-700">{getSmartRecommendation()}</p>
              </div>
            </div>
          </Card>

          {/* Map Controls */}
          <div className="absolute right-4 top-20 flex flex-col gap-2 z-30">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/90 shadow-md hover:bg-white"
              onClick={zoomIn}
            >
              <span className="text-lg font-bold">+</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/90 shadow-md hover:bg-white"
              onClick={zoomOut}
            >
              <span className="text-lg font-bold">-</span>
            </Button>
          
          </div>

          {/* Crowd Updates Notification */}
          {crowdUpdates.length > 0 && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-40">
              <Card className="bg-white/95 backdrop-blur-sm p-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium text-gray-900">
                    {crowdUpdates[0].location} is now {crowdUpdates[0].level}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
