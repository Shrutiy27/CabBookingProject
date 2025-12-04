"use client"

import { useEffect, useRef, useState } from "react"

interface Location {
  id: string
  x: number
  y: number
  title: string
  color: string
  icon: string
}

export default function MapComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to container
    const updateCanvasSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
        canvas.height = containerRef.current.clientHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const drawMap = () => {
      const width = canvas.width
      const height = canvas.height

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#f0f9ff")
      gradient.addColorStop(1, "#e0f2fe")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Grid lines
      ctx.strokeStyle = "#cbd5e1"
      ctx.lineWidth = 1
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }
      for (let i = 0; i < height; i += 50) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }
    }

    const drawMarker = (x: number, y: number, color: string, title: string, icon: string) => {
      // Marker shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.beginPath()
      ctx.ellipse(x, y + 15, 12, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Marker body
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y - 10, 12, 0, Math.PI * 2)
      ctx.fill()

      // Marker border
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Marker point
      ctx.beginPath()
      ctx.moveTo(x - 8, y)
      ctx.lineTo(x, y + 12)
      ctx.lineTo(x + 8, y)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()

      // Icon text
      ctx.fillStyle = "white"
      ctx.font = "bold 10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(icon, x, y - 10)

      // Title below marker
      ctx.fillStyle = "#1e293b"
      ctx.font = "11px Arial"
      ctx.textAlign = "center"
      ctx.fillText(title, x, y + 28)
    }

    const drawRoute = () => {
      const routePoints = [
        { x: 100, y: 150 },
        { x: 200, y: 120 },
        { x: 300, y: 200 },
        { x: 400, y: 180 },
      ]

      ctx.strokeStyle = "#f97316"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(routePoints[0].x, routePoints[0].y)
      for (let i = 1; i < routePoints.length; i++) {
        ctx.lineTo(routePoints[i].x, routePoints[i].y)
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    const locations: Location[] = [
      {
        id: "pickup",
        x: 100,
        y: 150,
        title: "Pickup Location",
        color: "#3b82f6",
        icon: "📍",
      },
      {
        id: "dropoff",
        x: 400,
        y: 180,
        title: "Dropoff Location",
        color: "#ef4444",
        icon: "🎯",
      },
      {
        id: "driver1",
        x: 200,
        y: 120,
        title: "Driver • 4.8★",
        color: "#22c55e",
        icon: "🚗",
      },
      {
        id: "driver2",
        x: 300,
        y: 200,
        title: "Driver • 4.9★",
        color: "#22c55e",
        icon: "🚗",
      },
    ]

    // Draw everything
    drawMap()
    drawRoute()
    locations.forEach((loc) => {
      drawMarker(loc.x, loc.y, loc.color, loc.title, loc.icon)
    })

    setIsReady(true)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full bg-sky-50 relative">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Map controls overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
          <span className="text-lg">🔍</span>
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
          <span className="text-lg">+</span>
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200">
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-md text-xs space-y-2 border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Pickup</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Dropoff</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Available Drivers</span>
        </div>
      </div>
    </div>
  )
}
