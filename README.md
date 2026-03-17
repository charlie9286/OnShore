## OnShore – Real Estate Marketplace (Fullstack)

### Project structure
- **`frontend/`**: React (Vite + TypeScript) app (deploy to Vercel)
- **`backend/`**: Express API (TypeScript) (deploy to Render)

### Running locally

### Frontend
From `frontend/`:

```bash
npm install
npm run dev
```

- **Dev URL**: `http://localhost:5173`
- **Backend base URL env**: set `VITE_API_URL` (see below)

### Backend
From `backend/`:

```bash
npm install
npm run dev
```

- **Health check**: `GET http://localhost:5000/api/health`

### Environment variables

### Frontend (`frontend/.env`)
Create `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5000
```

For production (Vercel), set:

```bash
VITE_API_URL=https://onshore-6lq6.onrender.com
```

### Backend (`backend/.env`)
Prisma creates `backend/.env` during init. For local dev, you can copy from `backend/.env.example` and adjust:

```bash
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onshore?schema=public
```

### Prisma (PostgreSQL)
Prisma is prepared for a future PostgreSQL instance on Render.

- **Schema**: `backend/prisma/schema.prisma`
- **Generate client**:

```bash
cd backend
npm run prisma:generate
```

- **Run migrations (once you have Postgres running)**:

```bash
cd backend
npm run prisma:migrate
```

