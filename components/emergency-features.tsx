"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Phone, MapPin, Shield, Siren, Heart, Navigation } from "lucide-react"

interface EmergencyFeaturesProps {
  currentLocation?: string
  onNavigateToEmergency: (locationId: string) => void
}

export function EmergencyFeatures({ onNavigateToEmergency }: EmergencyFeaturesProps) {
  const [emergencyActive, setEmergencyActive] = useState(false)

  const emergencyContacts = [
    { name: "Campus Security", number: "011-2635000", type: "security" },
    { name: "Medical Emergency", number: "1990", type: "medical" },
    { name: "Fire Department", number: "011-2422222", type: "fire" },
    { name: "Police Emergency", number: "119", type: "police" },
  ]

  const emergencyLocations = [
    { id: "main", name: "Security Office (MAIN Building)", type: "security" },
    { id: "gaff", name: "First Aid Station (GAFF Library)", type: "medical" },
    { id: "fireTraining", name: "Fire Safety Center", type: "fire" },
    { id: "swimmingPool", name: "Emergency Assembly Point", type: "assembly" },
  ]

  const handleEmergencyAlert = () => {
    setEmergencyActive(true)
    // In a real app, this would trigger campus-wide notifications
    setTimeout(() => setEmergencyActive(false), 10000)
  }

  return (
    <div className="space-y-4">
      {emergencyActive && (
        <Alert className="border-red-500 bg-red-50">
          <Siren className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Emergency alert activated. Campus security has been notified.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-gray-900">
            <Shield className="h-5 w-5 text-red-600" />
            Emergency Services
          </CardTitle>
          <CardDescription className="text-gray-700">Quick access to emergency contacts and locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleEmergencyAlert} className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
            <AlertTriangle className="mr-2 h-5 w-5" />
            EMERGENCY ALERT
          </Button>

          <div className="grid grid-cols-2 gap-2">
            {emergencyContacts.map((contact, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex flex-col h-auto p-3 text-gray-900 border-gray-300"
                onClick={() => window.open(`tel:${contact.number}`)}
              >
                {contact.type === "security" && <Shield className="h-4 w-4 mb-1" />}
                {contact.type === "medical" && <Heart className="h-4 w-4 mb-1" />}
                {contact.type === "fire" && <Siren className="h-4 w-4 mb-1" />}
                {contact.type === "police" && <Phone className="h-4 w-4 mb-1" />}
                <span className="text-xs font-medium">{contact.name}</span>
                <span className="text-xs text-gray-600">{contact.number}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Emergency Locations</h4>
            {emergencyLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded text-gray-900">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">{location.name}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigateToEmergency(location.id)}
                  className="text-gray-900"
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  Go
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
