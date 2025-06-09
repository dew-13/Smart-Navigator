"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Route, Clock, Users, Navigation } from "lucide-react"

interface RouteOptimizerProps {
  locations: Array<{
    id: string
    name: string
    category: string
    connections?: string[]
  }>
  crowdData: Record<string, { level: string; count: number }>
  onRouteSelect: (from: string, to: string) => void
}

export function RouteOptimizer({ locations, crowdData, onRouteSelect }: RouteOptimizerProps) {
  const [fromLocation, setFromLocation] = useState<string>("")
  const [toLocation, setToLocation] = useState<string>("")
  const [routePreference, setRoutePreference] = useState<"fastest" | "least-crowded" | "accessible">("fastest")

  const getRouteRecommendations = () => {
    if (!fromLocation || !toLocation) return []

    const recommendations = []

    // Add route preference based recommendations
    switch (routePreference) {
      case "fastest":
        recommendations.push({
          type: "Fastest Route",
          description: "Direct path with minimal stops",
          icon: <Route className="h-4 w-4" />,
          color: "bg-blue-100 text-gray-800",
        })
        break
      case "least-crowded":
        recommendations.push({
          type: "Avoid Crowds",
          description: "Route avoiding high-traffic areas",
          icon: <Users className="h-4 w-4" />,
          color: "bg-green-100 text-green-800",
        })
        break
      case "accessible":
        recommendations.push({
          type: "Accessible Route",
          description: "Wheelchair accessible with ramps and elevators",
          icon: <Navigation className="h-4 w-4" />,
          color: "bg-purple-100 text-purple-800",
        })
        break
    }

    // Add time-based recommendations
    const currentHour = new Date().getHours()
    if (currentHour >= 12 && currentHour <= 14) {
      recommendations.push({
        type: "Lunch Time",
        description: "Expect higher crowds near STORM Cafe",
        icon: <Clock className="h-4 w-4" />,
        color: "bg-orange-100 text-orange-800",
      })
    }

    return recommendations
  }

  const handleOptimizeRoute = () => {
    if (fromLocation && toLocation) {
      onRouteSelect(fromLocation, toLocation)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Route className="h-5 w-5" />
          Route Optimizer
        </CardTitle>
        <CardDescription>Find the best path between campus locations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">From</label>
            <Select value={fromLocation} onValueChange={setFromLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select starting location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">To</label>
            <Select value={toLocation} onValueChange={setToLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .filter((location) => location.id !== fromLocation)
                  .map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Route Preference</label>
            <Select value={routePreference} onValueChange={(value: any) => setRoutePreference(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fastest">Fastest Route</SelectItem>
                <SelectItem value="least-crowded">Avoid Crowds</SelectItem>
                <SelectItem value="accessible">Accessible Route</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleOptimizeRoute} disabled={!fromLocation || !toLocation} className="w-full">
            <Route className="mr-2 h-4 w-4" />
            Optimize Route
          </Button>
        </div>

        {/* Route Recommendations */}
        {getRouteRecommendations().length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recommendations</h4>
            {getRouteRecommendations().map((rec, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`${rec.color} flex items-center gap-1 p-2 w-full justify-start`}
              >
                {rec.icon}
                <div>
                  <div className="font-medium">{rec.type}</div>
                  <div className="text-xs opacity-80">{rec.description}</div>
                </div>
              </Badge>
            ))}
          </div>
        )}

        {/* Current Crowd Levels */}
        {(fromLocation || toLocation) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Crowd Levels</h4>
            {[fromLocation, toLocation].filter(Boolean).map((locationId) => {
              const location = locations.find((l) => l.id === locationId)
              const crowd = crowdData[locationId]
              if (!location || !crowd) return null

              return (
                <div key={locationId} className="flex items-center justify-between text-sm">
                  <span>{location.name}</span>
                  <Badge
                    variant="outline"
                    className={
                      crowd.level === "high"
                        ? "bg-red-100 text-red-800"
                        : crowd.level === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {crowd.level} ({crowd.count} people)
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
