"use client"

import { useState, useEffect, useCallback } from "react"

// Define the crowd data structure
interface CrowdInfo {
  level: "low" | "medium" | "high"
  count: number
  timestamp: number
}

interface CrowdUpdate {
  location: string
  level: "low" | "medium" | "high"
  previous: "low" | "medium" | "high"
  timestamp: number
}

export function useCrowdData() {
  const [crowdData, setCrowdData] = useState<Record<string, CrowdInfo>>({
    // Academic buildings tend to be busier
    gaff: { level: "high", count: 85, timestamp: Date.now() },
    wulfrun: { level: "medium", count: 45, timestamp: Date.now() },
    sky: { level: "medium", count: 35, timestamp: Date.now() },
    spencer: { level: "low", count: 15, timestamp: Date.now() },
    dallan: { level: "medium", count: 40, timestamp: Date.now() },
    zenith: { level: "high", count: 120, timestamp: Date.now() }, // New 6-floor building

    // Dining and social areas
    storm: { level: "high", count: 60, timestamp: Date.now() },
    studentCommon: { level: "medium", count: 30, timestamp: Date.now() },

    // Recreation
    swimmingPool: { level: "low", count: 12, timestamp: Date.now() },
    basketballCourt: { level: "medium", count: 18, timestamp: Date.now() }, // New basketball court
    yogaHut: { level: "low", count: 8, timestamp: Date.now() },

    // Maritime and training
    fore: { level: "medium", count: 25, timestamp: Date.now() },
    shipInCampus: { level: "low", count: 18, timestamp: Date.now() },
    fireTraining: { level: "low", count: 10, timestamp: Date.now() },

    // Workshops
    hanger: { level: "medium", count: 22, timestamp: Date.now() },
    hullock: { level: "medium", count: 28, timestamp: Date.now() },

    // Administrative and services
    main: { level: "low", count: 20, timestamp: Date.now() },
    mainStores: { level: "low", count: 5, timestamp: Date.now() },

    // Accommodation
    mizzen: { level: "medium", count: 50, timestamp: Date.now() },
    changingRooms: { level: "low", count: 8, timestamp: Date.now() },

    // Other buildings
    top: { level: "medium", count: 32, timestamp: Date.now() },
  })

  const [crowdUpdates, setCrowdUpdates] = useState<CrowdUpdate[]>([])
  const [wsConnected, setWsConnected] = useState(false)

  // Simulate WebSocket connection for real-time updates
  useEffect(() => {
    console.log("Connecting to CINEC crowd data WebSocket...")

    // Simulate connection established
    const connectionTimeout = setTimeout(() => {
      setWsConnected(true)
      console.log("WebSocket connected to CINEC campus")
    }, 1500)

    // Cleanup
    return () => {
      clearTimeout(connectionTimeout)
      console.log("WebSocket disconnected")
    }
  }, []) // Empty dependency array

  // Memoize the location names to prevent recreation
  const locationNames = useCallback(
    () => ({
      gaff: "GAFF Library",
      wulfrun: "WULFRUN Faculty",
      sky: "SKY Classrooms",
      spencer: "SPENCER Classroom",
      dallan: "DALLAN IT Labs",
      zenith: "ZENITH Building",
      storm: "STORM Cafe",
      studentCommon: "Student Common",
      swimmingPool: "Swimming Pool",
      basketballCourt: "Basketball Court",
      yogaHut: "Yoga Hut",
      fore: "FORE Building",
      shipInCampus: "Ship-in-Campus",
      fireTraining: "Fire Training",
      hanger: "HANGER Workshop",
      hullock: "HULLOCK Workshop",
      main: "MAIN Building",
      mainStores: "Main Stores",
      mizzen: "MIZZEN Hostel",
      changingRooms: "Changing Rooms",
      top: "TOP Building",
    }),
    [],
  )

  // Simulate receiving real-time crowd updates
  useEffect(() => {
    if (!wsConnected) return

    // All CINEC campus locations including new ones
    const locations = [
      "gaff",
      "wulfrun",
      "sky",
      "spencer",
      "dallan",
      "zenith",
      "storm",
      "studentCommon",
      "swimmingPool",
      "basketballCourt",
      "yogaHut",
      "fore",
      "shipInCampus",
      "fireTraining",
      "hanger",
      "hullock",
      "main",
      "mainStores",
      "mizzen",
      "changingRooms",
      "top",
    ]
    const levels: ("low" | "medium" | "high")[] = ["low", "medium", "high"]

    // Simulate periodic updates
    const updateInterval = setInterval(() => {
      // Pick a random location to update
      const locationIndex = Math.floor(Math.random() * locations.length)
      const location = locations[locationIndex]

      // Get current level using functional update to avoid stale closure
      setCrowdData((prevCrowdData) => {
        const currentLevel = prevCrowdData[location]?.level || "low"

        // Generate a new level that's different from current
        let newLevelIndex
        do {
          newLevelIndex = Math.floor(Math.random() * levels.length)
        } while (levels[newLevelIndex] === currentLevel)

        const newLevel = levels[newLevelIndex]

        // Generate a realistic count based on the level and building type
        let newCount: number
        const isAcademicBuilding = ["gaff", "wulfrun", "sky", "spencer", "dallan", "zenith"].includes(location)
        const isDiningArea = ["storm"].includes(location)
        const isAccommodation = ["mizzen"].includes(location)
        const isRecreation = ["basketballCourt", "swimmingPool"].includes(location)

        switch (newLevel) {
          case "high":
            if (location === "zenith")
              newCount = 80 + Math.floor(Math.random() * 60) // 80-140 (6-floor building)
            else if (isAcademicBuilding)
              newCount = 60 + Math.floor(Math.random() * 40) // 60-100
            else if (isDiningArea)
              newCount = 50 + Math.floor(Math.random() * 30) // 50-80
            else if (isAccommodation)
              newCount = 40 + Math.floor(Math.random() * 30) // 40-70
            else if (isRecreation)
              newCount = 20 + Math.floor(Math.random() * 15) // 20-35
            else newCount = 30 + Math.floor(Math.random() * 20) // 30-50
            break
          case "medium":
            if (location === "zenith")
              newCount = 40 + Math.floor(Math.random() * 40) // 40-80
            else if (isAcademicBuilding)
              newCount = 25 + Math.floor(Math.random() * 35) // 25-60
            else if (isDiningArea)
              newCount = 20 + Math.floor(Math.random() * 30) // 20-50
            else if (isAccommodation)
              newCount = 20 + Math.floor(Math.random() * 20) // 20-40
            else if (isRecreation)
              newCount = 10 + Math.floor(Math.random() * 15) // 10-25
            else newCount = 15 + Math.floor(Math.random() * 15) // 15-30
            break
          case "low":
            if (location === "zenith")
              newCount = 10 + Math.floor(Math.random() * 30) // 10-40
            else if (isRecreation)
              newCount = 2 + Math.floor(Math.random() * 8) // 2-10
            else newCount = 1 + Math.floor(Math.random() * 19) // 1-20
            break
          default:
            newCount = 10
        }

        const names = locationNames()
        const locationName = names[location as keyof typeof names] || location
        const update: CrowdUpdate = {
          location: locationName,
          level: newLevel,
          previous: currentLevel,
          timestamp: Date.now(),
        }

        setCrowdUpdates((prev) => [update, ...prev].slice(0, 5))

        // Remove the update notification after 5 seconds
        setTimeout(() => {
          setCrowdUpdates((prev) => prev.filter((u) => u !== update))
        }, 5000)

        // Return updated crowd data
        return {
          ...prevCrowdData,
          [location]: {
            level: newLevel,
            count: newCount,
            timestamp: Date.now(),
          },
        }
      })
    }, 12000) // Update every 12 seconds

    return () => clearInterval(updateInterval)
  }, [wsConnected, locationNames]) // Stable dependencies

  return { crowdData, crowdUpdates, isConnected: wsConnected }
}
