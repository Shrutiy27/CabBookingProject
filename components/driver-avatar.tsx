"use client"

interface DriverAvatarProps {
  name: string
  rating: number
  initials?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function DriverAvatar({ name, rating, initials, size = "md", className = "" }: DriverAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
  }

  // Generate consistent avatar background color based on name
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-indigo-500",
  ]
  const colorIndex = name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  const displayInitials =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-md ${className}`}
    >
      {displayInitials}
    </div>
  )
}
