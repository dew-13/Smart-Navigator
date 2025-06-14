/* "use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Navigation, MapPin, Bell } from "lucide-react"

interface TimetableIntegrationProps {
  userRole: "student" | "staff" | "visitor"
  onNavigateToClass: (locationId: string) => void
}

export function TimetableIntegration({ userRole, onNavigateToClass }: TimetableIntegrationProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextClass, setNextClass] = useState<any>(null)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, []) // Empty dependency array

  // Memoize the schedule to prevent recreation on every render
  const schedule = useMemo(() => {
    const today = currentTime.getDay() // 0 = Sunday, 1 = Monday, etc.

    if (userRole === "student") {
      const studentSchedule = {
        1: [
          // Monday
          { subject: "Human Computer Interaction", time: "09:00-11:00", location: "zenith", floor: 3, room: "301" },
          { subject: "Software Engineering", time: "13:00-15:00", location: "wulfrun", floor: 2, room: "201" },
          { subject: "Database Systems", time: "15:30-17:30", location: "dallan", floor: 1, room: "IT Lab 3" },
        ],
        2: [
          // Tuesday
          { subject: "Web Development", time: "08:00-10:00", location: "zenith", floor: 6, room: "IT Lab 6" },
          { subject: "Project Management", time: "10:30-12:30", location: "sky", floor: 1, room: "101" },
          { subject: "Mobile App Development", time: "14:00-16:00", location: "dallan", floor: 1, room: "IT Lab 2" },
        ],
        3: [
          // Wednesday
          { subject: "Computer Networks", time: "09:00-11:00", location: "wulfrun", floor: 1, room: "105" },
          { subject: "Artificial Intelligence", time: "13:00-15:00", location: "zenith", floor: 4, room: "401" },
          { subject: "Cybersecurity", time: "15:30-17:30", location: "dallan", floor: 1, room: "IT Lab 1" },
        ],
        4: [
          // Thursday
          { subject: "Software Testing", time: "08:00-10:00", location: "spencer", floor: 1, room: "201" },
          { subject: "System Analysis", time: "10:30-12:30", location: "zenith", floor: 2, room: "205" },
          { subject: "Practical Session", time: "14:00-17:00", location: "zenith", floor: 6, room: "IT Lab 6" },
        ],
        5: [
          // Friday
          { subject: "Final Year Project", time: "09:00-12:00", location: "wulfrun", floor: 3, room: "Project Room" },
          { subject: "Industry Seminar", time: "14:00-16:00", location: "main", floor: 1, room: "Auditorium" },
        ],
      }
      return studentSchedule[today] || []
    } else if (userRole === "staff") {
      const staffSchedule = {
        1: [
          // Monday
          { subject: "HCI Lecture", time: "09:00-11:00", location: "zenith", floor: 3, room: "301" },
          { subject: "Faculty Meeting", time: "14:00-15:00", location: "wulfrun", floor: 1, room: "Conference" },
        ],
        2: [
          // Tuesday
          { subject: "Web Dev Lab", time: "08:00-10:00", location: "zenith", floor: 6, room: "IT Lab 6" },
          { subject: "Student Consultation", time: "15:00-17:00", location: "wulfrun", floor: 2, room: "Office 205" },
        ],
        3: [
          // Wednesday
          { subject: "Research Work", time: "09:00-12:00", location: "gaff", floor: 1, room: "Research Lab" },
          { subject: "AI Lecture", time: "13:00-15:00", location: "zenith", floor: 4, room: "401" },
        ],
      }
      return staffSchedule[today] || []
    }
    return []
  }, [currentTime, userRole]) // Only depend on day and userRole

  // Find next class when currentTime or schedule changes
  useEffect(() => {
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()

    const upcoming = schedule.find((item) => {
      const [startTime] = item.time.split("-")
      const [hours, minutes] = startTime.split(":").map(Number)
      const classTimeInMinutes = hours * 60 + minutes
      return classTimeInMinutes > currentTimeInMinutes
    })

    setNextClass(upcoming || null)
  }, [currentTime, schedule]) // Depend on currentTime and memoized schedule

  const getTimeUntilClass = (classTime: string) => {
    const [startTime] = classTime.split("-")
    const [hours, minutes] = startTime.split(":").map(Number)
    const classTimeInMinutes = hours * 60 + minutes
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const diffInMinutes = classTimeInMinutes - currentTimeInMinutes

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes`
    } else {
      const hours = Math.floor(diffInMinutes / 60)
      const mins = diffInMinutes % 60
      return `${hours}h ${mins}m`
    }
  }

  const isClassSoon = (classTime: string) => {
    const [startTime] = classTime.split("-")
    const [hours, minutes] = startTime.split(":").map(Number)
    const classTimeInMinutes = hours * 60 + minutes
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const diffInMinutes = classTimeInMinutes - currentTimeInMinutes
    return diffInMinutes <= 30 && diffInMinutes > 0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2 text-gray-900">
          <BookOpen className="h-5 w-5" />
          Today&apos;s Schedule
        </CardTitle>
        <CardDescription className="text-gray-700">
          {userRole === "student" ? "Your class schedule" : "Your teaching schedule"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {nextClass && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-sm text-gray-900">Next Class</span>
              {isClassSoon(nextClass.time) && (
                <Badge variant="destructive" className="text-xs">
                  Starting Soon!
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">{nextClass.subject}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {nextClass.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {nextClass.room}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Starts in {getTimeUntilClass(nextClass.time)}</span>
                <Button size="sm" onClick={() => onNavigateToClass(nextClass.location)} className="h-7">
                  <Navigation className="h-3 w-3 mr-1" />
                  Navigate
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-900">Full Schedule</h4>
          {schedule.length === 0 ? (
            <p className="text-sm text-gray-600">No classes scheduled for today</p>
          ) : (
            schedule.map((item, index) => {
              const isPast = (() => {
                const [, endTime] = item.time.split("-")
                const [hours, minutes] = endTime.split(":").map(Number)
                const classEndInMinutes = hours * 60 + minutes
                const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
                return classEndInMinutes < currentTimeInMinutes
              })()

              const isCurrent = (() => {
                const [startTime, endTime] = item.time.split("-")
                const [startHours, startMinutes] = startTime.split(":").map(Number)
                const [endHours, endMinutes] = endTime.split(":").map(Number)
                const startInMinutes = startHours * 60 + startMinutes
                const endInMinutes = endHours * 60 + endMinutes
                const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
                return currentTimeInMinutes >= startInMinutes && currentTimeInMinutes < endInMinutes
              })()

              return (
                <div
                  key={index}
                  className={`p-3 border rounded-lg ${
                    isCurrent
                      ? "bg-green-50 border-green-200"
                      : isPast
                        ? "bg-gray-50 border-gray-200 opacity-60"
                        : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className={`font-medium text-sm ${isPast ? "text-gray-500" : "text-gray-900"}`}>
                        {item.subject}
                      </h5>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                        <span>{item.time}</span>
                        <span>{item.room}</span>
                        {item.floor && <span>Floor {item.floor}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <Badge variant="default" className="text-xs">
                          Now
                        </Badge>
                      )}
                      {isPast && (
                        <Badge variant="secondary" className="text-xs">
                          Completed
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onNavigateToClass(item.location)}
                        disabled={isPast}
                        className="h-6 px-2 text-gray-900"
                      >
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-900">Schedule Tips</span>
          </div>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Allow 10-15 minutes for walking between buildings</li>
            <li>• ZENITH Building has 6 floors - check floor number</li>
            <li>• IT Labs may require student ID card access</li>
            <li>• Check for room changes on notice boards</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
 */