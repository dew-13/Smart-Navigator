"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Navigation, RotateCcw, Calendar } from "lucide-react"

interface RouteHistoryItem {
  id: number
  date: string
  from: string
  to: string
  time: string
}

interface RouteHistoryProps {
  history: RouteHistoryItem[]
  userRole: "student" | "staff" | "visitor"
}

export function RouteHistory({ history, userRole }: RouteHistoryProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="recent">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="frequent">Frequent</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-4 space-y-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{item.date}</CardTitle>
                  <CardDescription className="text-xs">{item.time}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>{item.from}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span>{item.to}</span>
                </div>
              </CardContent>
              <CardContent className="flex justify-between pt-0">
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <Navigation className="h-3 w-3" />
                  Navigate
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <RotateCcw className="h-3 w-3" />
                  Repeat
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="frequent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Frequent Routes</CardTitle>
              <CardDescription>Your most traveled paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRole === "student" ? (
                  <>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Main Gate → Engineering Block</p>
                        <p className="text-xs text-muted-foreground">Used 15 times this month</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-4 w-4" />
                        Go
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Engineering Block → Cafeteria</p>
                        <p className="text-xs text-muted-foreground">Used 12 times this month</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-4 w-4" />
                        Go
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Cafeteria → Library</p>
                        <p className="text-xs text-muted-foreground">Used 8 times this month</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-4 w-4" />
                        Go
                      </Button>
                    </div>
                  </>
                ) : userRole === "staff" ? (
                  <>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Staff Parking → Admin Block</p>
                        <p className="text-xs text-muted-foreground">Used 20 times this month</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-4 w-4" />
                        Go
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="text-sm font-medium">Admin Block → Auditorium</p>
                        <p className="text-xs text-muted-foreground">Used 8 times this month</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Navigation className="h-4 w-4" />
                        Go
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="text-sm font-medium">Visitor Center → Admin Block</p>
                      <p className="text-xs text-muted-foreground">Used 3 times today</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Navigation className="h-4 w-4" />
                      Go
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Activity</CardTitle>
          <CardDescription>Your campus navigation patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">May 2025</span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total routes taken</span>
              <span className="font-medium">{userRole === "student" ? "42" : userRole === "staff" ? "35" : "8"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Most visited</span>
              <span className="font-medium">
                {userRole === "student" ? "Library" : userRole === "staff" ? "Admin Block" : "Visitor Center"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Average daily routes</span>
              <span className="font-medium">
                {userRole === "student" ? "3.5" : userRole === "staff" ? "2.8" : "2.0"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
