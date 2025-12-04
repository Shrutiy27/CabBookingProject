"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MapPin, Clock, DollarSign, Navigation, AlertCircle, Search } from "lucide-react"
import Link from "next/link"
import MapComponent from "@/components/map-component"
import { DriverCard } from "@/components/driver-card"
import { DriverAvatar } from "@/components/driver-avatar"
import { Star } from "lucide-react"

export default function BookRide() {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [fare, setFare] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rideStatus, setRideStatus] = useState<"idle" | "estimating" | "booked" | "searching" | "accepted">("idle")
  const [rideId, setRideId] = useState<number | null>(null)
  const [driverInfo, setDriverInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const mockAvailableDrivers = [
    {
      id: 1,
      name: "John Smith",
      rating: 4.8,
      reviews: 324,
      vehicle: "Toyota Prius",
      plate: "ABC123",
      eta: 4,
      distance: 2.1,
    },
    {
      id: 2,
      name: "Maria Garcia",
      rating: 4.9,
      reviews: 512,
      vehicle: "Honda Civic",
      plate: "XYZ789",
      eta: 6,
      distance: 2.8,
    },
    {
      id: 3,
      name: "Ahmed Khan",
      rating: 4.7,
      reviews: 289,
      vehicle: "Hyundai Elantra",
      plate: "DEF456",
      eta: 5,
      distance: 2.3,
    },
  ]

  const handleEstimate = async () => {
    if (!pickup || !dropoff) {
      setError("Please enter both pickup and dropoff locations")
      return
    }

    setError(null)
    setRideStatus("estimating")
    setIsLoading(true)

    setTimeout(() => {
      const mockDistance = Math.floor(Math.random() * 15) + 2
      const mockDuration = mockDistance * 3 + Math.floor(Math.random() * 10)
      const mockFare = Math.round(mockDistance * 1.5 * 100) / 100

      setDistance(mockDistance)
      setDuration(mockDuration)
      setFare(mockFare)
      setRideStatus("booked")
      setIsLoading(false)
    }, 800)
  }

  const handleBookRide = async () => {
    setRideStatus("searching")
    setIsLoading(true)

    setTimeout(() => {
      const mockRideId = Math.floor(Math.random() * 10000) + 1000
      setRideId(mockRideId)

      // Simulate driver found after 3 seconds
      setTimeout(() => {
        const selectedDriver = mockAvailableDrivers[Math.floor(Math.random() * mockAvailableDrivers.length)]
        setDriverInfo({
          ...selectedDriver,
          fare: fare,
        })
        setRideStatus("accepted")
        setIsLoading(false)
      }, 3000)
    }, 500)
  }

  const handleCancelRide = () => {
    setRideId(null)
    setDriverInfo(null)
    setRideStatus("idle")
    setFare(null)
    setDistance(null)
    setDuration(null)
  }

  const handleSelectDriver = (driver: any) => {
    setDriverInfo({
      ...driver,
      fare: fare,
    })
    setRideStatus("accepted")
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
                Book a Ride
              </h1>
              <p className="text-sm text-muted-foreground">Safe, Affordable, Reliable</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="h-96 lg:h-[600px] overflow-hidden shadow-xl border-0">
              <MapComponent />
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="p-6 shadow-xl border-0 sticky top-24">
              {rideStatus === "idle" || rideStatus === "estimating" || rideStatus === "booked" ? (
                <>
                  <h2 className="text-xl font-bold mb-6 text-pretty">Where to?</h2>

                  <div className="space-y-4">
                    {error && (
                      <div className="bg-destructive/10 border border-destructive/30 p-3 rounded-lg flex gap-2">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-primary text-opacity-50" />
                        <Input
                          placeholder="Enter pickup address"
                          value={pickup}
                          onChange={(e) => {
                            setPickup(e.target.value)
                            setError(null)
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Dropoff Location</label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-3 w-4 h-4 text-primary text-opacity-50" />
                        <Input
                          placeholder="Enter dropoff address"
                          value={dropoff}
                          onChange={(e) => {
                            setDropoff(e.target.value)
                            setError(null)
                          }}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleEstimate}
                      disabled={isLoading || rideStatus !== "idle"}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-12"
                    >
                      {isLoading ? "Estimating fare..." : "Estimate Fare"}
                    </Button>

                    {fare !== null && (
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Estimated Fare
                          </span>
                          <span className="text-2xl font-bold text-primary">${fare.toFixed(2)}</span>
                        </div>
                        {distance && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Distance</span>
                            <span className="font-semibold">{distance} km</span>
                          </div>
                        )}
                        {duration && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Est. Duration
                            </span>
                            <span className="font-semibold">{duration} min</span>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={handleBookRide}
                      disabled={isLoading || fare === null}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-12"
                    >
                      {isLoading && rideStatus === "searching" ? "Searching for drivers..." : "Book Ride"}
                    </Button>
                  </div>
                </>
              ) : rideStatus === "searching" ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold mb-1">Finding a driver...</h2>
                    <p className="text-sm text-muted-foreground">Ride ID: #{rideId}</p>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">Checking nearby drivers...</p>

                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <Search className="w-3 h-3" />
                      Nearby drivers
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {mockAvailableDrivers.map((driver) => (
                        <div
                          key={driver.id}
                          onClick={() => handleSelectDriver(driver)}
                          className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <DriverAvatar name={driver.name} rating={driver.rating} size="sm" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">{driver.name}</p>
                              <p className="text-xs text-muted-foreground">{driver.eta} min away</p>
                            </div>
                          </div>
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" onClick={handleCancelRide} className="w-full bg-transparent">
                    Cancel Request
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold">Driver Found!</h2>
                    <p className="text-sm text-muted-foreground">Arriving soon</p>
                  </div>

                  {driverInfo && (
                    <>
                      <DriverCard
                        id={driverInfo.id}
                        name={driverInfo.name}
                        rating={driverInfo.rating}
                        reviews={driverInfo.reviews}
                        vehicle={driverInfo.vehicle}
                        plate={driverInfo.plate}
                        eta={driverInfo.eta}
                        distance={driverInfo.distance}
                        fare={driverInfo.fare}
                        pickup={pickup}
                        dropoff={dropoff}
                        variant="detailed"
                      />

                      <Button variant="outline" onClick={handleCancelRide} className="w-full bg-transparent">
                        Cancel Ride
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
