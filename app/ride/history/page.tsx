"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Clock, Star } from "lucide-react"
import Link from "next/link"

interface RideHistory {
  id: number
  date: string
  from: string
  to: string
  driver: string
  rating: number
  fare: number
  duration: number
  distance: number
}

export default function RideHistory() {
  const [rides, setRides] = useState<RideHistory[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("all")

  useEffect(() => {
    const mockHistory: RideHistory[] = [
      {
        id: 1,
        date: "Today at 2:45 PM",
        from: "123 Main St",
        to: "456 Oak Ave",
        driver: "John Smith",
        rating: 5,
        fare: 15.5,
        duration: 18,
        distance: 8,
      },
      {
        id: 2,
        date: "Yesterday at 6:30 PM",
        from: "Airport Terminal 2",
        to: "Hotel Grand Plaza",
        driver: "Sarah Johnson",
        rating: 4,
        fare: 28.75,
        duration: 32,
        distance: 18,
      },
      {
        id: 3,
        date: "3 days ago at 10:15 AM",
        from: "Central Park",
        to: "Union Station",
        driver: "Mike Chen",
        rating: 5,
        fare: 12.0,
        duration: 14,
        distance: 6,
      },
    ]
    setRides(mockHistory)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Ride History</h1>
            <p className="text-sm text-muted-foreground">View your past rides</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {(["all", "completed", "cancelled"] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={filter === f ? "bg-primary text-primary-foreground" : ""}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Rides List */}
        <div className="space-y-4">
          {rides.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No rides yet</p>
            </Card>
          ) : (
            rides.map((ride) => (
              <Card key={ride.id} className="p-5 hover:shadow-md transition-shadow border-l-4 border-l-primary">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{ride.date}</p>
                    <p className="font-semibold text-lg mt-1">{ride.driver}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${ride.fare.toFixed(2)}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {[...Array(ride.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{ride.from}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{ride.to}</span>
                  </div>
                </div>

                <div className="flex gap-4 text-xs text-muted-foreground pt-4 border-t">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {ride.duration} min
                  </span>
                  <span>{ride.distance} km</span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
