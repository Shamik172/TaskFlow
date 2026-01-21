# TaskFlow – Full Stack Assignment

A full-stack web application built as part of the Frontend Developer Intern assignment.

## Tech Stack
Frontend:
- React.js
- Tailwind CSS
- Axios
- Context API

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- Multer + Cloudinary

## Features

### Authentication
- User signup & login
- JWT-based authentication
- HTTP-only cookies
- Role-based access (User / Admin)

### Dashboard (User)
- View profile
- Create, update, delete tasks
- Task status toggle (pending/completed)
- Search & filter tasks
- Pagination (5 tasks/page)
- Logout

### Admin Dashboard
- View all users
- View individual user activity
- Paginated task history
- Protected admin routes

## Project Structure
- frontend/
- backend/


## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

## Create .env with:
```bash
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
## Frontend
```bash
cd frontend
npm install
npm run dev
```
## Create .env with:
```bash
VITE_BACKEND_URL=
```

## API Endpoints

### Authentication (`/auth`)

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login user | Public |
| POST | `/auth/logout` | Logout user | Authenticated |
| GET  | `/auth/me` | Get current logged-in user | Authenticated |

---

### Tasks (`/tasks`)

> All task routes are protected using JWT authentication.

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| POST | `/tasks` | Create a new task | User |
| GET  | `/tasks` | Get logged-in user’s tasks (search, filter) | User |
| PUT  | `/tasks/:id` | Update a task | User |
| DELETE | `/tasks/:id` | Delete a task | User |

---

### Users (`/users`)

#### User Routes

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| PATCH | `/users/avatar` | Upload or update user avatar | User |

---

#### Admin Routes

| Method | Endpoint | Description | Access |
|------|---------|------------|--------|
| GET | `/users` | Get all users (excluding passwords) | Admin |
| GET | `/users/admin/:userId` | Get paginated task history of a specific user | Admin |

---

## API Documentation

Postman Collection:
https://shamikmandal170-9060092.postman.co/workspace/Shamik's-Workspace~093df344-6430-44de-8a8d-623fa0206bbd/collection/51699788-533e68ba-4f38-485f-ab07-598128702701?action=share&creator=51699788&active-environment=51699788-cb55023e-3a45-431f-820a-8723878d0fb7

Base URL:
http://localhost:5000/api

> Note: Viewing the Postman collection requires a Postman account due to Postman platform policies.


## Notes
- All protected routes require **JWT authentication**
- Admin routes require **admin role**
- Request validation is handled using **Zod**
- File uploads are handled using **Multer + Cloudinary**

## Security

- Password hashing using bcrypt
- JWT authentication middleware
- Role-based authorization
- Secure cookies
- Input validation & error handling

## Author
Shamik Mandal
