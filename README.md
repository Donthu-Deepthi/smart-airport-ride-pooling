# Smart Airport Ride Pooling Backend System

A backend system that groups passengers into shared airport cabs while optimizing
seating, detours, pricing, and handling real-time cancellations.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman (API Testing)

---

## 📌 Features

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

## 📁 Project Structure

airport-ride-pooling/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
├── frontend/
│ ├── index.html
│ ├── css/
│ └── js/
│
├── README.md
└── .gitignore
