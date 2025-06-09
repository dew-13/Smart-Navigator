"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Building } from "lucide-react"

interface SearchBarProps {
  onLocationSelect: (locationId: string) => void
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [open, setOpen] = useState(false)

  // Updated locations with new buildings
  const locations = [
    // Academic Buildings
    { id: "gaff", name: "GAFF Library", category: "Academic" },
    { id: "sky", name: "SKY Classrooms", category: "Academic" },
    { id: "spencer", name: "SPENCER Classroom", category: "Academic" },
    { id: "wulfrun", name: "WULFRUN Faculty", category: "Academic" },
    { id: "top", name: "TOP Building (Marine Engineering)", category: "Academic" },
    { id: "zenith", name: "ZENITH Building (6 Floors)", category: "Academic" },

    // Maritime & Training
    { id: "fore", name: "FORE Building (Simulators)", category: "Maritime" },
    { id: "shipInCampus", name: "Ship-in-Campus", category: "Maritime" },
    { id: "fireTraining", name: "Fire Training Simulator", category: "Training" },

    // Technology & Labs
    { id: "dallan", name: "DALLAN IT Labs", category: "Technology" },

    // Workshops
    { id: "hanger", name: "HANGER Workshop", category: "Workshop" },
    { id: "hullock", name: "HULLOCK Workshop", category: "Workshop" },

    // Administrative
    { id: "main", name: "MAIN Building (Reception)", category: "Administrative" },

    // Dining & Services
    { id: "storm", name: "STORM Cafe", category: "Dining" },
    { id: "mainStores", name: "Main Stores", category: "Services" },

    // Recreation & Wellness
    { id: "swimmingPool", name: "Swimming Pool & Gymnasium", category: "Recreation" },
    { id: "basketballCourt", name: "Basketball Court", category: "Recreation" },
    { id: "yogaHut", name: "Yoga Hut", category: "Wellness" },

    // Accommodation & Student Life
    { id: "mizzen", name: "MIZZEN Hostel", category: "Accommodation" },
    { id: "studentCommon", name: "Student Common Faculty", category: "Student Life" },

    // Facilities
    { id: "changingRooms", name: "Changing Rooms", category: "Facilities" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[305px] justify-start text-muted-foreground bg-white/95 border-2 border-border hover:bg-white shadow-sm backdrop-blur-sm"
        >
          <Search className="mr-2 h-4 w-4 text-primary" />
          Search CINEC campus buildings...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search campus buildings..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {[
              "Academic",
              "Maritime",
              "Technology",
              "Workshop",
              "Administrative",
              "Dining",
              "Recreation",
              "Accommodation",
            ].map((category) => (
              <CommandGroup key={category} heading={category}>
                {locations
                  .filter((location) => location.category === category)
                  .map((location) => (
                    <CommandItem
                      key={location.id}
                      onSelect={() => {
                        onLocationSelect(location.id)
                        setOpen(false)
                      }}
                    >
                      {location.id === "zenith" ? (
                        <Building className="mr-2 h-4 w-4" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      {location.name}
                      {location.id === "zenith" && (
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded">6 Floors</span>
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
