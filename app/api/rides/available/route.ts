import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock available rides
    const mockRides = [
      {
        id: 1,
        rider_id: 101,
        rider_name: "Sarah Johnson",
        pickup_location: "123 Main St, Downtown",
        dropoff_location: "456 Oak Ave, Business District",
        estimated_fare: 15.5,
        distance: 8,
        duration: 18,
        status: "searching",
      },
      {
        id: 2,
        rider_id: 102,
        rider_name: "Mike Chen",
        pickup_location: "Airport Terminal 2",
        dropoff_location: "Hotel Grand Plaza",
        estimated_fare: 28.75,
        distance: 18,
        duration: 32,
        status: "searching",
      },
    ]

    return NextResponse.json({
      success: true,
      rides: mockRides,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch available rides" }, { status: 500 })
  }
}
