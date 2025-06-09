"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navigation, Plus, Share2, ArrowRight } from "lucide-react"

interface Route {
  id: number
  name: string
  path: string[]
  saved: boolean
}

interface RoutesListProps {
  routes: Route[]
  userRole: "student" | "staff" | "visitor"
}

export function RoutesList({ routes, userRole }: RoutesListProps) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create New Route</CardTitle>
          <CardDescription>Find the best path between locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="Starting point" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Destination" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full gap-2" disabled={!from || !to}>
            <Navigation className="h-4 w-4" />
            Find Route
          </Button>
        </CardFooter>
      </Card>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium">Saved Routes</h3>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Plus className="h-3 w-3" />
            Add New
          </Button>
        </div>

        <div className="space-y-4">
          {routes.map((route) => (
            <Card key={route.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{route.name}</CardTitle>
              </CardHeader>
               <CardContent>{renderRoutePath(route.path)}</CardContent>

              <CardFooter className="flex justify-between pt-2">
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 text-xs"
                  onClick={() => handleShare(route)}
                >
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {userRole === "student" && (
        <div>
          <Separator className="my-4" />
          <h3 className="mb-4 text-sm font-medium">Class Schedule Routes</h3>

          <Card>
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
