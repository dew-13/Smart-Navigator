export interface RouteHistory {
  id: number
  date: string
  from: string
  to: string
  time: string
}

export const history: RouteHistory[] = [
  {
    id: 1,
    date: "2024-03-20",
    from: "Main Entrance",
    to: "GAFF Library",
    time: "09:00 AM"
  },
  {
    id: 2,
    date: "2024-03-20",
    from: "GAFF Library",
    to: "STORM Cafe",
    time: "12:30 PM"
  },
  {
    id: 3,
    date: "2024-03-20",
    from: "STORM Cafe",
    to: "DALLIAN IT Labs",
    time: "02:00 PM"
  }
] 