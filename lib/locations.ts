export interface Location {
  id: string
  name: string
  x: number
  y: number
  description: string
  openingHours: string
  currentEvent: string
  category: string
  facilities: string[]
  connections?: string[]
  floors?: Array<{
    floor: number
    description: string
    capacity: number
  }>
}

export const locations: Location[] = [
  {
    id: "mainEntrance",
    name: "Main Entrance",
    x: 28,
    y: 85,
    description: "Main gate access",
    openingHours: "24/7",
    currentEvent: "Open",
    category: "entrance",
    facilities: ["Security desk", "Information center", "Access control"]
  },
  {
    id: "gaff",
    name: "GAFF Library",
    x: 35,
    y: 45,
    description: "Library, Labs & Examination Center",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Study hours",
    category: "academic",
    facilities: ["Study rooms", "Computer stations", "Printing services", "Examination center"],
    connections: ["mainEntrance", "storm", "dallan"]
  },
  {
    id: "storm",
    name: "STORM Cafe",
    x: 45,
    y: 35,
    description: "Cafe, Restaurant & Bakery",
    openingHours: "7:00 AM - 7:00 PM",
    currentEvent: "Lunch service",
    category: "dining",
    facilities: ["Food court", "Seating area", "Bakery", "Restaurant"],
    connections: ["gaff", "dallan", "mainEntrance"]
  },
  {
    id: "dallan",
    name: "DALLIAN IT Labs",
    x: 55,
    y: 25,
    description: "IT labs & Marine Electronics Lab",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Computer lab session",
    category: "academic",
    facilities: ["Workstations", "Printing", "Technical support", "Marine Electronics"],
    connections: ["storm", "zenth", "gaff"]
  },
  {
    id: "zenth",
    name: "ZENITH BUILDING - IT Lab 6",
    x: 65,
    y: 15,
    description: "IT labs",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Computer lab session",
    category: "academic",
    facilities: ["Workstations", "Developing", "Technical support"],
    connections: ["dallan", "main"]
  },
  {
    id: "main",
    name: "MAIN Building",
    x: 75,
    y: 5,
    description: "Reception, Finance & Auditorium",
    openingHours: "8:30 AM - 4:30 PM",
    currentEvent: "Administrative services",
    category: "administrative",
    facilities: ["Reception", "Finance office", "Auditorium", "Student services"],
    connections: ["zenth", "zenith"]
  },
  {
    id: "zenith",
    name: "ZENITH Building",
    x: 85,
    y: 15,
    description: "6-floor academic building with classrooms and IT Lab 6",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Multi-floor classes in session",
    category: "academic",
    facilities: ["6 floors", "Classrooms", "IT Lab 6", "Elevators"],
    connections: ["main", "basketballCourt"],
    floors: [
      { floor: 1, description: "Ground Floor", capacity: 200 },
      { floor: 2, description: "First Floor", capacity: 150 },
      { floor: 3, description: "Second Floor", capacity: 150 },
      { floor: 4, description: "Third Floor", capacity: 150 },
      { floor: 5, description: "Fourth Floor", capacity: 150 },
      { floor: 6, description: "Fifth Floor", capacity: 150 }
    ]
  },
  {
    id: "basketballCourt",
    name: "Basketball Court",
    x: 95,
    y: 25,
    description: "Outdoor basketball court for student recreation",
    openingHours: "6:00 AM - 7:00 PM",
    currentEvent: "Available for play",
    category: "sports",
    facilities: ["Outdoor court", "Lighting", "Seating area"],
    connections: ["zenith", "wulfrun"]
  },
  {
    id: "wulfrun",
    name: "WULFRUN Faculty",
    x: 85,
    y: 35,
    description: "Faculty of Management, Engineering & Technology",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Engineering lectures",
    category: "academic",
    facilities: ["Faculty offices", "Lecture halls", "Meeting rooms"],
    connections: ["basketballCourt", "fore"]
  },
  {
    id: "fore",
    name: "FORE Building",
    x: 75,
    y: 45,
    description: "Engine & Bridge Simulator & Liquid Cargo Simulator",
    openingHours: "8:00 AM - 5:00 PM",
    currentEvent: "Maritime simulation training",
    category: "academic",
    facilities: ["Simulators", "Training rooms", "Maritime equipment"],
    connections: ["wulfrun", "mizzen"]
  },
  {
    id: "mizzen",
    name: "MIZZEN Hostel",
    x: 65,
    y: 55,
    description: "Student accommodation facility",
    openingHours: "24/7",
    currentEvent: "Residential facility",
    category: "residential",
    facilities: ["Student rooms", "Common areas", "Laundry"],
    connections: ["fore", "swimmingPool"]
  },
  {
    id: "swimmingPool",
    name: "Swimming Pool & Gymnasium",
    x: 55,
    y: 65,
    description: "Swimming pool, gymnasium, and laundry facilities",
    openingHours: "6:00 AM - 7:00 PM",
    currentEvent: "Swimming practice",
    category: "sports",
    facilities: ["Swimming pool", "Gymnasium", "Changing rooms", "Laundry"],
    connections: ["mizzen", "mainEntrance"]
  }
] 