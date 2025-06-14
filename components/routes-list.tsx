"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navigation, Share2, ArrowRight, Trash2 } from "lucide-react"
import { locations, type Location } from "./map-container"

interface Route {
  id: number | string
  name: string
  path: string[]
  saved?: boolean
  timestamp?: number
}

interface RoutesListProps {
  routes: Route[]
  userRole: "student" | "staff" | "visitor"
  onLocationSelect?: (locationId: string, field: "from" | "to") => void
  onFindRoute?: (from: string, to: string) => void
  fromValue: string
  toValue: string
  onFromChange: (id: string) => void
  onToChange: (id: string) => void
  onClearRoute?: () => void
  onDeleteRoute?: (id: number | string) => void
}

export function RoutesList({ routes, userRole, onFindRoute, fromValue, toValue, onFromChange, onToChange, }: RoutesListProps) {
  const [fromDropdown, setFromDropdown] = useState(false)
  const [toDropdown, setToDropdown] = useState(false)
  const [showConfirm, setShowConfirm] = useState<null | number | string>(null)

  useEffect(() => {
    if (fromValue && toValue && onFindRoute) {
      onFindRoute(fromValue, toValue)
    }
  }, [fromValue, toValue, onFindRoute])

  const handleFromSelect = (id: string) => {
    onFromChange(id)
    setFromDropdown(false)
  }
  const handleToSelect = (id: string) => {
    onToChange(id)
    setToDropdown(false)
  }

  const handleShare = async (route: Route) => {
    const shareText = `Here's a shortcut ${route.name}\n${route.path}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Route: ${route.name}`,
          text: shareText,
        })
      } catch (error) {
        console.error("Share failed:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText)
        alert("Route copied to clipboard!")
      } catch (err) {
        alert("Failed to copy to clipboard")
        console.error("Clipboard write failed:", err)
      }
    }
  }
  const renderRoutePath = (path: string[]) => (
    <div className="flex items-center gap-2 text-sm">
      {path.map((stop, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
          <span>{stop}</span>
        </span>
      ))}
    </div>
  )


  return (
    <div className="space-y-2 px-2 w-full max-w-full">
      <Card className="w-full max-w-full">
        <CardHeader>
          <CardTitle className="text-base">Find the Route</CardTitle>
          <CardDescription>Find the best path between locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2 relative">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="Starting point" value={fromValue} onFocus={() => setFromDropdown(true)} onChange={(e) => onFromChange(e.target.value)} autoComplete="off" />
              {fromDropdown && (
                <div className="absolute z-10 bg-white border rounded w-full max-w-full overflow-y-auto shadow">
                  {(locations as Location[]).map((loc) => (
                    <div key={loc.id} className="px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={() => handleFromSelect(loc.id)}>
                      {loc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Destination" value={toValue} onFocus={() => setToDropdown(true)} onChange={(e) => onToChange(e.target.value)} autoComplete="off" />
              {toDropdown && (
                <div className="absolute z-10 bg-white border rounded w-full max-w-full overflow-y-auto shadow">
                  {(locations as Location[]).map((loc) => (
                    <div key={loc.id} className="px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={() => handleToSelect(loc.id)}>
                      {loc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="gap-2 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
            onClick={() => { onFromChange(""); onToChange(""); }}
          >
            <Trash2 className="h-4 w-4" />
            Clear Route
          </Button>
        </CardFooter>
      </Card>

      <div className="w-full max-w-full">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium">Saved Routes</h3>
          {/* <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Plus className="h-3 w-3" />
            Add New
          </Button> */}
        </div>

        <div className="space-y-4">
          {routes.map((route) => (
            <Card key={route.id} className="w-full max-w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{route.name}</CardTitle>
              </CardHeader>
              <CardContent>{renderRoutePath(route.path)}</CardContent>
              <CardFooter className="flex justify-between pt-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 text-xs"
                  onClick={() => handleShare(route)}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 text-xs text-red-500"
                  onClick={() => setShowConfirm(route.id)}
                  aria-label="Delete Route"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
              {showConfirm === route.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
                  <div className="bg-white rounded shadow-lg p-4 flex flex-col items-center gap-3 border">
                    <p className="text-sm text-gray-800">Are you sure you want to delete this route?</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="bg-red-500 text-white hover:bg-red-600" onClick={() => { setShowConfirm(null); }}>Confirm</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowConfirm(null)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {userRole === "student" && (
        <div className="w-full max-w-full">
          <Separator className="my-4" />
          <h3 className="mb-4 text-sm font-medium">Class Schedule Routes</h3>

          <Card className="w-full max-w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Today&apos;s Classes</CardTitle>
              <CardDescription>Routes based on your timetable</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-xs font-medium">Human Computer Interaction</p>
                    <p className="text-xs text-muted-foreground">9:00 AM - 12:00 AM</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                    <Navigation className="h-3 w-3" />
                    Go
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-md border p-2">
                  <div>
                    <p className="text-xs font-medium">Software Engineering</p>
                    <p className="text-xs text-muted-foreground">1:00 PM - 4:00 PM</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                    <Navigation className="h-3 w-3" />
                    Go
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
