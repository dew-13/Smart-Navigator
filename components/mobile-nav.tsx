"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search } from "lucide-react"
import { UserMenu } from "@/components/user-menu"

interface MobileNavProps {
  onMenuClick: () => void
  userRole: "student" | "staff" | "visitor"
  onRoleChange: (role: "student" | "staff" | "visitor") => void
}

export function MobileNav({ onMenuClick, userRole, onRoleChange }: MobileNavProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto mr-2">
            <Search className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-16">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search locations, classrooms, offices..." className="h-9" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                Library
              </Button>
              <Button variant="outline" size="sm">
                Cafeteria
              </Button>
              <Button variant="outline" size="sm">
                Computer Lab
              </Button>
              <Button variant="outline" size="sm">
                Admin Block
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <UserMenu userRole={userRole} onRoleChange={onRoleChange} />
    </div>
  )
}
