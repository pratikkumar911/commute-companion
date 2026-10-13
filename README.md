# Commute Companion

Commute Companion is a small full-stack learning app with short lessons, quizzes,
progress tracking, history, and leaderboards.

## Prerequisites

- Git
- Node.js 18 or later and npm

## Clone and install

Replace `<repository-url>` with the URL of this repository:

```sh
git clone <repository-url>
cd commute-companion

cd server
npm install

cd ../client
npm install
```

## Run locally

Start the API server in one terminal:

```sh
cd commute-companion/server
npm start
```

The API listens on `http://localhost:4000` by default. To use a different port,
set the `PORT` environment variable before starting the server.

Start the web app in a second terminal:

```sh
cd commute-companion/client
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:5173`). The
development server proxies `/api` requests to the API server on port 4000.

For automatic server restarts while developing, use `npm run dev` from the
`server` directory instead of `npm start`.

## Demo sign-in

The server seeds demo accounts on startup. Sign in with any username below;
all demo accounts use PIN `1234`.

| Username | City |
| --- | --- |
| `priya` | Pune |
| `alex` | Mumbai |
| `sam` | Pune |
| `maya` | Bangalore |
| `raj` | Delhi |
| `kiran` | Pune |

The server stores users and lesson completions in memory, so this demo data is
reset whenever the server restarts.

## Backend layout

The Express app is configured in `server/app.js`; `server/index.js` starts the
listener. API endpoints are grouped in `server/routes/`, authentication
middleware is in `server/middleware/`, and in-memory users/completions live in
`server/data/store.js`. Shared date, progress, and user-formatting helpers are
in `server/utils/`.