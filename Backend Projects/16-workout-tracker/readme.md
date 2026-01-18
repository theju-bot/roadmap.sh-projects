# Workout Tracker API

A RESTful API for tracking workouts built with Node.js, Express, and MongoDB. This application allows users to register, log in, and manage their workout routines with exercises, sets, reps, and weights.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Workout Management**: Create, view, edit, and delete workout sessions
- **Exercise Library**: Pre-seeded exercise database with various categories
- **Session Management**: Cookie-based authentication with httpOnly cookies
- **Request Logging**: Automated logging of requests and errors
- **Data Validation**: Comprehensive input validation for all operations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt
- **Logging**: Custom logging middleware with dayjs
- **Environment**: dotenv for configuration

## Project Structure

```
├── config/
│   └── dbConn.js           # Database connection configuration
├── controllers/
│   ├── authControllers.js   # Authentication logic
│   └── workoutControllers.js # Workout CRUD operations
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   ├── logEvents.js         # Request/error logging
│   └── verifyJWT.js         # JWT verification middleware
├── model/
│   ├── UsersWT.js           # User schema
│   ├── ExercisesWT.js       # Exercise schema
│   └── WorkOutWT.js         # Workout schema
├── routes/
│   ├── register.js          # Registration route
│   ├── login.js             # Login route
│   ├── logout.js            # Logout route
│   └── api/
│       └── workoutApi.js    # Workout API routes
├── seeders/
│   └── seed.js              # Database seeding script
└── server.js                # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance running locally or remotely

### Installation

1. Clone the repository:
```bash
git clone https://github.com/theju-bot/roadmap.sh-projects.git
cd roadmap.sh-projects/Backend\ Projects/16-workout-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URI=mongodb://localhost:27017/workout-tracker
ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
```

4. Seed the database with exercise data:
```bash
npm run seed
```

5. Start the server:
```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

The server will start on `http://localhost:5000` (or your specified PORT).

## API Endpoints

### Authentication

#### Register a New User
```http
POST /register
Content-Type: application/json

{
  "userName": "john_doe",
  "password": "securePassword123"
}
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "userName": "john_doe",
  "password": "securePassword123"
}
```

Returns user details, exercises list, and sets an httpOnly JWT cookie.

#### Logout
```http
POST /logout
```

Clears the authentication cookie.

### Workouts (Protected Routes)

All workout routes require authentication via JWT cookie.

#### Get All User Workouts
```http
GET /api/workout
```

#### Create a Workout
```http
POST /api/workout
Content-Type: application/json

{
  "exercises": [
    {
      "exercise": "exercise_id_here",
      "sets": 3,
      "reps": 10,
      "weight": 50
    }
  ],
  "date": "2026-01-18",
  "comments": "Great session!"
}
```

#### Update a Workout
```http
PUT /api/workout
Content-Type: application/json

{
  "id": "workout_id_here",
  "exercises": [...],
  "date": "2026-01-18",
  "comments": "Updated notes"
}
```

#### Delete a Workout
```http
DELETE /api/workout/:id
```

## Pre-seeded Exercises

The application comes with 12 pre-seeded exercises covering major muscle groups:

- **Chest**: Barbell Bench Press
- **Legs**: Back Squat, Bulgarian Split Squat
- **Back**: Conventional Deadlift, Pull-ups/Chin-ups, Bent Over Barbell Row
- **Shoulders**: Overhead Press, Dumbbell Lateral Raise
- **Hamstrings**: Romanian Deadlift
- **Rear Delts**: Face Pulls
- **Cardio**: Treadmill/Outdoor Running
- **Core**: Plank (various variations)

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 15-minute expiration
- HttpOnly cookies to prevent XSS attacks
- SameSite cookie attribute for CSRF protection
- Input validation on all routes
- User authorization checks for workout operations

## Logging

The application automatically logs:
- All incoming requests to `logs/reqLog.txt`
- Errors to `logs/errLog.txt`
- Timestamps and request details using dayjs and uuid

## Error Handling

Centralized error handling middleware captures and logs all errors, providing consistent error responses to clients.

## Development Notes

- Cookie `secure` flag is commented out for local development (enable in production with HTTPS)
- JWT tokens expire after 15 minutes
- User can only view, edit, and delete their own workouts
- Exercise IDs must reference valid exercises in the database

## Scripts

```bash
npm start        # Start the server
npm run dev      # Start with nodemon (auto-restart)
npm run seed     # Seed the database with exercises
```

## 👨‍💻 Author

**Thesigan Yogarasa**  
MERN Stack Enthusiast & Aspiring Fullstack Developer

## License

ISC

---

Built as part of the [roadmap.sh](https://roadmap.sh/projects/fitness-workout-tracker) backend project series.