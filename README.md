# ShineSquad Car Wash Booking Backend

A backend-only final project for a car wash booking platform built with Express, TypeScript, MongoDB, JWT authentication, logging, and layered architecture.

## Main Features
- Customer registration and login
- Guest booking and registered-user booking
- Service management
- Slot management
- Admin approval, decline, completion, and analytics
- Centralized logging and error handling
- Jest test scaffold

## Run the Project
1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Run in development with `npm run dev`

## Main Routes
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/bookings/guest`
- `POST /api/bookings`
- `GET /api/bookings/my`
- `PATCH /api/admin/bookings/:id/approve`

## Notes
This scaffold follows the same general Express + TypeScript + MongoDB direction used in course examples, but is reorganized into a cleaner project structure for the final project.
