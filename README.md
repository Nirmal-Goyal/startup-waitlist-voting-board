# Startup Waitlist & Feature Voting Board

A simple full-stack application that allows users to join a startup waitlist and vote for upcoming features.

## Features

- Email waitlist registration
- Feature voting system
- Automatic sorting by votes
- REST API backend
- Next.js frontend

## Tech Stack

Frontend
- Next.js

Backend
- Express.js

Database
- JSON file (mock database)

## API Endpoints

### Join Waitlist

POST /waitlist

Body:

{
  "email": "user@example.com"
}

### Get Features

GET /features

### Upvote Feature

POST /features/:id/upvote

## Running Locally

### Backend

cd backend

npm install

npm run dev

### Frontend

cd frontend

npm install

npm run dev
