"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, MapPin, Clock, Navigation, Users } from "lucide-react"

interface ParkingInfoProps {
  onNavigateToParking: (parkingId: string) => void
}

export function ParkingInfo({ onNavigateToParking }: ParkingInfoProps) {
  const [parkingData, setParkingData] = useState({
    studentParking: { total: 150, occupied: 89, reserved: 10 },
    staffParking: { total: 50, occupied: 15, reserved: 5 },
    visitorParking: { total: 20, occupied: 8, reserved: 0 },
    motorcycleParking: { total: 60, occupied: 34, reserved: 0 },
  })

  // Simulate real-time parking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingData((prev) => ({
        studentParking: {
          ...prev.studentParking,
          occupied: Math.max(
            0,
            Math.min(
              prev.studentParking.total - prev.studentParking.reserved,
              prev.studentParking.occupied + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3),
            ),
          ),
        },
        staffParking: {
          ...prev.staffParking,
          occupied: Math.max(
            0,
            Math.min(
              prev.staffParking.total - prev.staffParking.reserved,
              prev.staffParking.occupied + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
            ),
          ),
        },
        visitorParking: {
          ...prev.visitorParking,
          occupied: Math.max(
            0,
            Math.min(
              prev.visitorParking.total,
              prev.visitorParking.occupied + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
            ),
          ),
        },
        motorcycleParking: {
          ...prev.motorcycleParking,
          occupied: Math.max(
            0,
            Math.min(
              prev.motorcycleParking.total,
              prev.motorcycleParking.occupied + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
            ),
          ),
        },
      }))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getAvailabilityColor = (occupied: number, total: number, reserved: number) => {
    const available = total - occupied - reserved
    const percentage = (available / total) * 100
    if (percentage > 30) return "text-green-600"
    if (percentage > 10) return "text-yellow-600"
    return "text-red-600"
  }

  const getAvailabilityStatus = (occupied: number, total: number, reserved: number) => {
    const available = total - occupied - reserved
    const percentage = (available / total) * 100
    if (percentage > 30) return "Available"
    if (percentage > 10) return "Limited"
    return "Full"
  }

  const parkingAreas = [
    {
      id: "studentParking",
      name: "Student Parking",
      location: "Car Park",
      data: parkingData.studentParking,
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "staffParking",
      name: "Staff Parking",
      location: "Near WULFRUNA Building",
      data: parkingData.staffParking,
      icon: <Car className="h-4 w-4" />,
    },
    {
      id: "visitorParking",
      name: "Visitor Parking",
      location: "Car Park",
      data: parkingData.visitorParking,
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "motorcycleParking",
      name: "Motorcycle Parking",
      location: "Infront of Main Entrance",
      data: parkingData.motorcycleParking,
      icon: <Car className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2 text-gray-900">
          <Car className="h-5 w-5" />
          Parking Information
        </CardTitle>
        <CardDescription className="text-gray-700">Real-time parking availability across campus</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {parkingAreas.map((area) => {
          const available = area.data.total - area.data.occupied - area.data.reserved
          const occupancyPercentage = (area.data.occupied / area.data.total) * 100

          return (
            <div key={area.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {area.icon}
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">{area.name}</h4>
                    <p className="text-xs text-gray-600">{area.location}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={getAvailabilityColor(area.data.occupied, area.data.total, area.data.reserved)}
                >
                  {getAvailabilityStatus(area.data.occupied, area.data.total, area.data.reserved)}
                </Badge>
              </div>

              <Progress value={occupancyPercentage} className="h-2" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-700">
                  {available} available of {area.data.total} spaces
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigateToParking(area.id)}
                  className="h-6 px-2 text-gray-900"
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  Navigate
                </Button>
              </div>

              {area.data.reserved > 0 && <p className="text-xs text-gray-600">{area.data.reserved} spaces reserved</p>}
            </div>
          )
        })}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Parking Tips</span>
          </div>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Peak hours: 8:00-9:00 AM and 3:00-5:00 PM</li>
            <li>• Motorcycle parking is usually available</li>
            <li>• Visitor parking in car park</li>
            <li>• Staff parking requires valid permit</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
