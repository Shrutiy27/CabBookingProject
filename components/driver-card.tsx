"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Navigation, Clock, Users } from "lucide-react"
import { DriverAvatar } from "./driver-avatar"

interface DriverCardProps {
  id: number
  name: string
  rating: number
  reviews: number
  vehicle: string
  plate: string
  eta: number
  distance?: number
  fare?: number
  pickup?: string
  dropoff?: string
  onAccept?: (id: number) => void
  isLoading?: boolean
  variant?: "compact" | "detailed"
}

export function DriverCard({
  id,
  name,
  rating,
  reviews,
  vehicle,
  plate,
  eta,
  distance,
  fare,
  pickup,
  dropoff,
  onAccept,
  isLoading = false,
  variant = "compact",
}: DriverCardProps) {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="p-4 space-y-3">
        {/* Driver Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <DriverAvatar name={name} rating={rating} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg truncate">{name}</h3>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700">{rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{reviews} reviews</p>
            </div>
          </div>
          {fare && (
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${fare.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">fare</p>
            </div>
          )}
        </div>

        {/* Vehicle Info */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{vehicle}</p>
            <p className="text-xs text-muted-foreground font-mono">{plate}</p>
          </div>
          <div className="text-2xl">🚗</div>
        </div>

        {/* Details */}
        {variant === "detailed" ? (
          <div className="space-y-2">
            {pickup && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground truncate">{pickup}</p>
              </div>
            )}
            {dropoff && (
              <div className="flex items-start gap-2 text-sm">
                <Navigation className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground truncate">{dropoff}</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-background p-2 rounded text-center">
                <p className="text-xs text-muted-foreground">ETA</p>
                <p className="font-bold text-sm">{eta} min</p>
              </div>
              {distance && (
                <div className="bg-background p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="font-bold text-sm">{distance} km</p>
                </div>
              )}
              <div className="bg-background p-2 rounded text-center">
                <p className="text-xs text-muted-foreground">
                  <Users className="w-3 h-3 inline" />
                </p>
                <p className="font-bold text-sm">4.0</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{eta} min</span>
              </div>
              {distance && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{distance} km</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {onAccept && (
          <Button
            onClick={() => onAccept(id)}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-10"
          >
            {isLoading ? "Accepting..." : "Accept Ride"}
          </Button>
        )}
      </div>
    </Card>
  )
}
