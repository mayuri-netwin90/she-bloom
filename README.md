# Bloom Platform

A full-stack platform with separate APIs for mobile and backoffice applications.

## Project Structure

```
bloom-platform/
├── apps/
│   ├── api/              # Backend API (Express + TypeScript)
│   │   ├── src/
│   │   │   ├── backoffice-api/  # Backoffice API endpoints
│   │   │   ├── mobile-api/      # Mobile API endpoints
│   │   │   ├── database/        # Database configuration
│   │   │   └── docs/            # Swagger/OpenAPI docs
│   │   └── package.json
│   └── backoffice/       # Frontend (React + Vite + Mantine)
│       ├── src/
│       └── package.json
├── docker-compose.yml    # PostgreSQL and Keycloak containers
└── package.json          # Root workspace configuration
```

## Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL (or Docker for containerized database)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bloom-platform
```

2. Install dependencies:
```bash
pnpm install
```

## Database Setup

### Option 1: Using Docker (Recommended)

1. Start PostgreSQL and Keycloak:
```bash
docker compose up -d
```

2. Verify containers are running:
```bash
docker compose ps
```

### Option 2: Using Local PostgreSQL

1. Install PostgreSQL on your system:
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql@16
brew services start postgresql@16
```

2. Create database and user:
```bash
sudo -u postgres psql
```

Run the following SQL commands:
```sql
CREATE USER bloom WITH PASSWORD 'bloom';
CREATE DATABASE bloom OWNER bloom;
GRANT ALL PRIVILEGES ON DATABASE bloom TO bloom;
\q
```

3. The API will automatically connect to `postgres://bloom:bloom@localhost:5432/bloom`

## Running the Application

### 1. Start the Backend API

```bash
cd /var/www/html/bloom-platform
pnpm --filter api start:dev
```

The API will start on `http://localhost:3000`

### 2. Start the Backoffice Frontend

In a new terminal:

```bash
cd /var/www/html/bloom-platform
pnpm --filter backoffice dev
```

The frontend will start on `http://localhost:5173`

## Accessing the Application

### Frontend
- **Backoffice UI**: http://localhost:5173

### API Documentation (Swagger)
- **Backoffice API**: http://localhost:3000/backoffice/api
- **Mobile API**: http://localhost:3000/mobile/api

### API Endpoints

**Backoffice API:**
- POST `/backoffice/auth/login` - Admin login
- GET `/backoffice/auth/me` - Get current admin
- GET `/backoffice/users` - List all backoffice users

**Mobile API:**
- POST `/mobile/auth/login` - User login
- GET `/mobile/auth/me` - Get current user
- GET `/mobile/users/profile` - Get user profile
- PATCH `/mobile/users/profile` - Update user profile

## Default Credentials

**Backoffice Admin:**
- Email: `admin@bloom.local`
- Password: `ChangeMe123!`

**Mobile User:**
- Email: `member@bloom.local`
- Password: `ChangeMe123!`

## Testing APIs with Swagger

1. Open the Swagger UI (http://localhost:3000/backoffice/api or http://localhost:3000/mobile/api)
2. Click the **Authorize** button (🔒 icon) at the top right
3. First, call the `/auth/login` endpoint to get a JWT token
4. Copy the `accessToken` from the response
5. Paste it in the Authorize dialog (without "Bearer" prefix)
6. Click Authorize
7. Now you can test protected endpoints

## Development

### Backend API

```bash
cd apps/api
pnpm start:dev    # Development with watch mode
pnpm build        # Build for production
pnpm test         # Run tests
```

### Frontend

```bash
cd apps/backoffice
pnpm dev          # Development server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

## Environment Variables

**Backend API (apps/api):**
- `DATABASE_URL` - PostgreSQL connection string (default: `postgres://bloom:bloom@localhost:5432/bloom`)
- `JWT_SECRET` - Secret for JWT token signing (default: development secret, change in production)
- `NODE_ENV` - Environment (default: development)

**Frontend (apps/backoffice):**
- `VITE_API_URL` - Backend API URL (default: `http://localhost:3000`)

## Database Schema

The database automatically initializes with two tables:

**backoffice_users:**
- id (UUID)
- email (TEXT, unique)
- name (TEXT)
- password_hash (TEXT)
- role (TEXT: ADMIN, OPERATOR, VIEWER)
- is_active (BOOLEAN)
- last_login_at (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)

**mobile_users:**
- id (UUID)
- email (TEXT, unique)
- name (TEXT)
- password_hash (TEXT)
- is_active (BOOLEAN)
- last_login_at (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)

## Troubleshooting

**Database connection error:**
- Ensure PostgreSQL is running (`sudo systemctl status postgresql` or `docker compose ps`)
- Check the connection string in `apps/api/src/database/database.ts`
- Verify database and user exist

**API not starting:**
- Check if port 3000 is already in use
- Ensure dependencies are installed (`pnpm install`)

**Frontend not connecting to API:**
- Verify API is running on http://localhost:3000
- Check `VITE_API_URL` environment variable
- Check browser console for CORS errors

## Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL (pg driver)
- JWT Authentication
- Swagger/OpenAPI

**Frontend:**
- React 19
- Vite
- TypeScript
- Mantine UI
