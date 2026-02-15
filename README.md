# Smart Airport Ride Pooling Backend System

A backend system that groups passengers into shared airport cabs while optimizing
seating, detours, pricing, and handling real-time cancellations.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman (API Testing)

---

## Features

- Passenger creation
- Cab creation
- Smart pooling into shared cabs
- Seat & luggage constraints
- Detour tolerance check
- Distance calculation (Haversine)
- Dynamic pricing engine
- Concurrency-safe booking (transactions)
- Real-time booking cancellation
- MongoDB indexing

---

## Project Structure

```text
airport-ride-pooling/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
│
├── README.md
└── .gitignore

```
---

## Setup Instructions

### 1️. Clone Repository

```bash
git clone https://github.com/Donthu-Deepthi/smart-airport-ride-pooling.git
cd smart-airport-ride-pooling/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3️. Create Environment File

Inside backend/ create a .env file:

```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

### 4. Run the Server

```bash
npm run dev
```

Server will start at:
```bash
http://localhost:5000
```

---

## API Endpoints

### Create Cab

```bash
http://localhost:5000/api/cabs
```
### Create Passenger

```bash
http://localhost:5000/api/passengers
```
### Cancel Booking

```bash
http://localhost:5000/api/bookings/:id/cancel
```

---

## Sample API Request Bodies

### Create Cab

```json
{
  "driverName": "Ramesh",
  "totalSeats": 4,
  "availableSeats": 4,
  "luggageCapacity": 3
}
```
### Create Passenger

```json
{
  "name": "Sriram",
  "pickupLocation": { "lat": 17.385, "lng": 78.486 },
  "luggage": 1,
  "seatsRequired": 1
}
```

---

## Dynamic Pricing Logic

Fare is calculated using:
```bash
fare = BASE_FARE + (distance × PER_KM_RATE)
```

If multiple passengers share the ride:
```bash
Discount applied for pooling
```
Distance is calculated using the Haversine formula.

---

## Frontend Demo (Optional)

Open:
``bash
frontend/index.html
```
---

## Features

- Passenger creation  
- Cab creation  
- Smart pooling into shared cabs  
- Seat & luggage constraint handling  
- Detour tolerance validation  
- Radius-based passenger matching  
- Distance calculation using Haversine formula  
- Dynamic pricing engine  
- Concurrency-safe booking using MongoDB transactions  
- Real-time booking cancellation  
- MongoDB indexing for faster queries  
- Optional frontend demo for booking  

---


