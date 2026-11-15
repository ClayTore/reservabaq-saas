# ReservaBaq

SaaS to discover and book restaurants in Barranquilla, Colombia.

Diners can search restaurants by name, area or type of food, check the menu, schedule and dress code, and book a table. Restaurant owners get a private panel with a summary of their reservations.

**Live site:** coming soon (custom domain pointing to an AWS Application Load Balancer)

## Features

- Landing page with a short explanation of how it works
- Restaurant catalog with search by name or area and filter by type of food
- Restaurant detail page with schedule, dress code, address and menu with prices
- Table reservation form with validation (no past dates, 10-digit phone)
- "Mis reservas" page to see and cancel bookings
- Demo login and a protected panel with stats and upcoming reservations

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static export) with React and TypeScript
- Tailwind CSS v4
- ESLint
- GitHub Actions for CI/CD
- AWS: S3, EC2 with Auto Scaling, Application Load Balancer

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/ClayTore/reservabaq-saas.git
cd reservabaq-saas
npm install
npm run juju
```

Then open http://localhost:3000.

### Demo login

| Email | Password |
|---|---|
| demo@reservabaq.com | reservabaq2026 |

> This login is only a demo that runs in the browser. It is not real security. In production we would use a service like Amazon Cognito.

## Scripts

| Command | What it does |
|---|---|
| `npm run juju` | Starts the development server |
| `npm run lint` | Checks the code with ESLint |
| `npm run build` | Builds the static site into the `out/` folder |