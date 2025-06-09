/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Navigation, Share2, Plus, TrendingUp } from "lucide-react"
import { CrowdLevelIndicator } from "@/components/crowd-level-indicator"
import { useCrowdData } from "@/hooks/use-crowd-data"
import { CrowdTrend } from "@/components/crowd-trend"

interface LocationDetailsProps {
  location: any
  locationId: string
}

export function LocationDetails({ location, locationId }: LocationDetailsProps) {
  const { crowdData } = useCrowdData()

  if (!location) return null

  const crowdInfo = crowdData[locationId]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{location.name}</CardTitle>
          <div className="flex items-center gap-2">
            <CrowdLevelIndicator level={crowdInfo?.level || "low"} showText size="md" />
          </div>
        </div>
        <CardDescription>{location.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{location.openingHours}</span>
            </div>
            <Badge variant="outline">{location.currentEvent}</Badge>
          </div>

          <Separator />

          <div>
            <h4 className="mb-2 text-sm font-medium">Facilities</h4>
            <div className="flex flex-wrap gap-2">
              {location.facilities.map((facility: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Current Status</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border p-2">
                <p className="text-xs text-muted-foreground">People Count</p>
                <p className="text-sm font-medium">{crowdInfo?.count || 0} people</p>
              </div>
              <div className="rounded-md border p-2">
                <p className="text-xs text-muted-foreground">Wait Time</p>
                <p className="text-sm font-medium">
                  {crowdInfo?.level === "high" ? "15-20 min" : crowdInfo?.level === "medium" ? "5-10 min" : "No wait"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Crowd Trend
            </h4>
            <CrowdTrend locationId={locationId} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-1">
          <Navigation className="h-4 w-4" />
          Navigate
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}
