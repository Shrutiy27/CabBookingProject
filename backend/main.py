from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RideHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "RideHub API running"}

@app.post("/api/rides/estimate")
async def estimate_fare(request: dict):
    estimated_fare = round(request.get("distance", 5) * 1.5, 2)
    return {"estimated_fare": estimated_fare}

@app.post("/api/rides/request")
async def request_ride(request: dict):
    return {"ride_id": 1001, "status": "searching"}

@app.post("/api/rides/accept")
async def accept_ride(request: dict):
    return {"success": True, "ride_id": request.get("ride_id")}cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000