import { type NextRequest, NextResponse } from "next/server"

let rideCounter = 1000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    rideCounter++

    const rideData = {
      id: rideCounter,
      rider_id: body.rider_id,
      pickup_location: body.pickup_location,
      dropoff_location: body.dropoff_location,
      estimated_fare: body.estimated_fare,
      status: "searching",
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      ride_id: rideCounter,
      status: "searching",
      ...rideData,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create ride request" }, { status: 500 })
  }
}
