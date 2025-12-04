import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    return NextResponse.json({
      success: true,
      ride_id: body.ride_id,
      driver_id: body.driver_id,
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to accept ride" }, { status: 500 })
  }
}
