"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Users, DollarSign, Star, Zap } from "lucide-react"

export default function Home() {
  const [userType, setUserType] = useState<"rider" | "driver" | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("userType")
    if (stored) setUserType(stored as "rider" | "driver")
  }, [])

  const handleUserTypeSelect = (type: "rider" | "driver") => {
    setUserType(type)
    localStorage.setItem("userType", type)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">RideHub</h1>
            <p className="text-sm text-muted-foreground">Ride-sharing platform</p>
          </div>
          {userType && (
            <Button
              variant="ghost"
              onClick={() => {
                setUserType(null)
                localStorage.removeItem("userType")
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {!userType ? (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-pretty">Welcome to RideHub</h2>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                The modern ride-sharing platform for safe, affordable, and reliable transportation
              </p>
            </div>

            {/* User Type Selection */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
              {/* Rider Card */}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Book a Ride</h3>
                  <p className="text-muted-foreground mb-6">Get to your destination safely and affordably</p>
                  <Button
                    onClick={() => handleUserTypeSelect("rider")}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                  >
                    Continue as Rider
                  </Button>
                </div>
              </Card>

              {/* Driver Card */}
              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Earn Money</h3>
                  <p className="text-muted-foreground mb-6">Accept rides and earn on your own schedule</p>
                  <Button
                    onClick={() => handleUserTypeSelect("driver")}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
                  >
                    Continue as Driver
                  </Button>
                </div>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Quick Booking</h4>
                <p className="text-sm text-muted-foreground">Request a ride in seconds with real-time matching</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Transparent Pricing</h4>
                <p className="text-sm text-muted-foreground">No hidden charges, know your fare upfront</p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Safe & Rated</h4>
                <p className="text-sm text-muted-foreground">Verified drivers and riders with ratings</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                {userType === "rider" ? (
                  <MapPin className="w-12 h-12 text-primary" />
                ) : (
                  <Users className="w-12 h-12 text-primary" />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">{userType === "rider" ? "Ready to Ride?" : "Ready to Earn?"}</h2>
              <p className="text-muted-foreground mb-8">
                {userType === "rider" ? "Book your ride and get moving" : "Accept rides and start earning"}
              </p>
            </div>
            <div className="space-y-3">
              {userType === "rider" ? (
                <Link href="/ride/book">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-12">
                    Book a Ride Now
                  </Button>
                </Link>
              ) : (
                <Link href="/driver/dashboard">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-12">
                    View Ride Requests
                  </Button>
                </Link>
              )}
              <Link href="/ride/history">
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  View History
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setUserType(null)
                  localStorage.removeItem("userType")
                }}
                className="w-full"
              >
                Switch User Type
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
