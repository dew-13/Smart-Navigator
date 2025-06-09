"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useCrowdData } from "@/hooks/use-crowd-data"

interface CrowdTrendProps {
  locationId: string
}

export function CrowdTrend({ locationId }: CrowdTrendProps) {
  const { crowdData } = useCrowdData()
  const [trendData, setTrendData] = useState<Array<{ time: string; count: number }>>([])

  // Generate simulated historical data for the trend
  useEffect(() => {
    const currentHour = new Date().getHours()
    const currentCount = crowdData[locationId]?.count || 0

    // Generate data for the past 6 hours
    const data = []
    for (let i = 0; i < 6; i++) {
      const hour = (currentHour - 5 + i) % 24
      const timeStr = `${hour}:00`

      // Create a realistic pattern
      let count
      if (hour >= 8 && hour <= 10) {
        // Morning peak
        count = 40 + Math.floor(Math.random() * 30)
      } else if (hour >= 12 && hour <= 14) {
        // Lunch peak
        count = 60 + Math.floor(Math.random() * 40)
      } else if (hour >= 16 && hour <= 18) {
        // Afternoon peak
        count = 50 + Math.floor(Math.random() * 30)
      } else {
        // Off-peak hours
        count = 10 + Math.floor(Math.random() * 20)
      }

      // Make the last point match the current count
      if (i === 5) {
        count = currentCount
      }

      data.push({ time: timeStr, count })
    }

    setTrendData(data)
  }, [locationId, crowdData])

  // Find max count for scaling
  const maxCount = Math.max(...trendData.map((d) => d.count), 100)

  return (
    <Card className="p-2">
      <div className="h-24 w-full">
        <div className="flex h-full items-end justify-between">
          {trendData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-8 bg-primary/80 rounded-t"
                style={{
                  height: `${(data.count / maxCount) * 100}%`,
                  minHeight: "4px",
                }}
              />
              <div className="mt-1 text-xs text-muted-foreground">{data.time}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Past 6 hours</span>
        <span>Current: {crowdData[locationId]?.count || 0} people</span>
      </div>
    </Card>
  )
}
