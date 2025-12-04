"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Loader2, Star, Navigation, Clock, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { DriverAvatar } from "@/components/driver-avatar"

const MapComponent = dynamic(() => import("@/components/map-component"), { ssr: false })

interface RideRequest {
  id: number
  rider_id: number
  rider_name: string
  rider_rating?: number
  pickup_location: string
  dropoff_location: string
  estimated_fare: number
  distance: number
  duration: number
}

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([])
  const [currentRide, setCurrentRide] = useState<RideRequest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [earnings, setEarnings] = useState(0)
  const [rating, setRating] = useState(4.8)
  const [totalRides, setTotalRides] = useState(0)
  const [acceptanceRate, setAcceptanceRate] = useState(98)

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const mockRequests: RideRequest[] = [
          {
            id: 1,
            rider_id: 101,
            rider_name: "Sarah Johnson",
            rider_rating: 4.9,
            pickup_location: "123 Main St, Downtown",
            dropoff_location: "456 Oak Ave, Business District",
            estimated_fare: 15.5,
            distance: 8,
            duration: 18,
          },
          {
            id: 2,
            rider_id: 102,
            rider_name: "Mike Chen",
            rider_rating: 4.7,
            pickup_location: "Airport Terminal 2",
            dropoff_location: "Hotel Grand Plaza",
            estimated_fare: 28.75,
            distance: 18,
            duration: 32,
          },
          {
            id: 3,
            rider_id: 103,
            rider_name: "Emma Davis",
            rider_rating: 5.0,
            pickup_location: "Central Park",
            dropoff_location: "Union Station",
            estimated_fare: 12.0,
            distance: 6,
            duration: 14,
          },
        ]
        setRideRequests(mockRequests)
      } catch (error) {
        console.error("Error fetching ride requests:", error)
      }
    }

    if (isOnline) {
      fetchRideRequests()
      const interval = setInterval(fetchRideRequests, 5000)
      return () => clearInterval(interval)
    }
  }, [isOnline])

  const handleAcceptRide = async (ride: RideRequest) => {
    setIsLoading(true)
    try {
      setTimeout(() => {
        setCurrentRide(ride)
        setRideRequests(rideRequests.filter((r) => r.id !== ride.id))
        setTotalRides(totalRides + 1)
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error accepting ride:", error)
      setIsLoading(false)
    }
  }

  const handleCompleteRide = () => {
    if (currentRide) {
      const amount = currentRide.estimated_fare
      setEarnings(earnings + amount)
      setCurrentRide(null)
    }
  }

  const handleDeclineRide = () => {
    setCurrentRide(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Driver Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Earn money on your schedule</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
              <span className="text-xs font-medium text-muted-foreground">{isOnline ? "Online" : "Offline"}</span>
            </div>
            <Button
              onClick={() => setIsOnline(!isOnline)}
              className={`${
                isOnline ? "bg-green-600 hover:bg-green-700 shadow-lg" : "bg-muted hover:bg-muted/80"
              } text-white font-semibold`}
            >
              <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
              {isOnline ? "Online" : "Go Online"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="h-96 lg:h-[600px] overflow-hidden shadow-xl border-0">
              <MapComponent />
            </Card>
          </div>

          {/* Requests & Stats */}
          <div className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-200/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Today's Earnings</p>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-700">${earnings.toFixed(2)}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-200/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Rating
                  </p>
                  <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                </div>
                <p className="text-2xl font-bold text-amber-700">{rating}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-200/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Total Rides</p>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-700">{totalRides}</p>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-200/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Acceptance</p>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-700">{acceptanceRate}%</p>
              </Card>
            </div>

            {/* Active Ride or Requests */}
            {currentRide ? (
              <Card className="p-6 border-2 border-primary/30 shadow-lg bg-gradient-to-br from-primary/5 to-transparent">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Active Ride
                </h2>

                <div className="space-y-4">
                  {/* Rider Card */}
                  <div className="bg-card p-4 rounded-lg border border-primary/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <DriverAvatar
                          name={currentRide.rider_name}
                          rating={currentRide.rider_rating || 4.5}
                          size="md"
                        />
                        <div>
                          <p className="font-semibold">{currentRide.rider_name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-muted-foreground">{currentRide.rider_rating || 4.5}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${currentRide.estimated_fare.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">fare</p>
                      </div>
                    </div>
                  </div>

                  {/* Pickup & Dropoff */}
                  <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Pickup Location
                      </p>
                      <p className="font-semibold text-sm">{currentRide.pickup_location}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-red-500" />
                        Dropoff Location
                      </p>
                      <p className="font-semibold text-sm">{currentRide.dropoff_location}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="bg-background p-3 rounded text-center">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="font-bold">{currentRide.distance} km</p>
                      </div>
                      <div className="bg-background p-3 rounded text-center">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" />
                          Duration
                        </p>
                        <p className="font-bold">{currentRide.duration} min</p>
                      </div>
                      <div className="bg-background p-3 rounded text-center">
                        <p className="text-xs text-muted-foreground mb-1">Type</p>
                        <p className="font-bold">Standard</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCompleteRide}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12"
                  >
                    Complete Ride
                  </Button>

                  <Button variant="outline" onClick={handleDeclineRide} className="w-full bg-transparent">
                    Cancel
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-bold">Available Requests</h2>
                  <p className="text-xs text-muted-foreground">
                    {isOnline ? rideRequests.length + " nearby" : "Go online to see requests"}
                  </p>
                </div>

                {!isOnline ? (
                  <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-dashed border-2 border-primary/20">
                    <MapPin className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                    <p className="text-muted-foreground font-semibold">Go Online</p>
                    <p className="text-sm text-muted-foreground mt-1">Enable online mode to start accepting rides</p>
                  </Card>
                ) : rideRequests.length === 0 ? (
                  <Card className="p-8 text-center bg-muted/30">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
                    <p className="text-muted-foreground font-semibold">No requests nearby</p>
                    <p className="text-sm text-muted-foreground mt-1">Keep online, new requests will appear</p>
                  </Card>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {rideRequests.map((ride) => (
                      <Card
                        key={ride.id}
                        className="p-4 border-2 hover:border-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <div className="space-y-3">
                          {/* Rider info with avatar */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <DriverAvatar name={ride.rider_name} rating={ride.rider_rating || 4.5} size="md" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{ride.rider_name}</p>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span className="text-xs text-muted-foreground">{ride.rider_rating || 4.5}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">${ride.estimated_fare.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">fare</p>
                            </div>
                          </div>

                          {/* Locations */}
                          <div className="bg-background p-2.5 rounded text-xs space-y-2">
                            <p className="text-muted-foreground flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              <span className="truncate">{ride.pickup_location}</span>
                            </p>
                            <p className="text-muted-foreground flex items-center gap-2">
                              <Navigation className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="truncate">{ride.dropoff_location}</span>
                            </p>
                          </div>

                          {/* Ride details */}
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {ride.distance} km
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {ride.duration} min
                            </span>
                          </div>

                          <Button
                            onClick={() => handleAcceptRide(ride)}
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10"
                          >
                            {isLoading ? "Accepting..." : "Accept Ride"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
