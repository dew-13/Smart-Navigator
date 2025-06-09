import { Users } from "lucide-react"

interface CrowdLevelIndicatorProps {
  level: "low" | "medium" | "high"
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function CrowdLevelIndicator({ level, showText = false, size = "sm" }: CrowdLevelIndicatorProps) {
  const getColorClass = () => {
    switch (level) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "lg":
        return "h-5 w-5"
      case "md":
        return "h-4 w-4"
      case "sm":
      default:
        return "h-3 w-3"
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Users className={`${getSizeClass()} ${getColorClass()}`} />
      {showText && (
        <span className={`text-xs ${getColorClass()}`}>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
      )}
    </div>
  )
}
