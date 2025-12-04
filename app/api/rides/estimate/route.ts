import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mock distance and time calculation
    // In production, use Google Maps Distance Matrix API
    const mockDistance = Math.floor(Math.random() * 15) + 2
    const mockDuration = mockDistance * 3 + Math.floor(Math.random() * 10)
    const baseFare = 2.5
    const perKmRate = 1.5
    const perMinuteRate = 0.25

    const estimatedFare = Math.round((baseFare + mockDistance * perKmRate + mockDuration * perMinuteRate) * 100) / 100

    return NextResponse.json({
      estimated_fare: estimatedFare,
      distance: mockDistance,
      duration: mockDuration,
      pickup_location: body.pickup_location,
      dropoff_location: body.dropoff_location,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to estimate fare" }, { status: 500 })
  }
}
