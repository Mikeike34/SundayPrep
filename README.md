# 🥗 SundayPrep

A recipe finder web app built with React, Node.js, Express, and Tailwind CSS, powered by [TheMealDB](https://www.themealdb.com/).

## Features
- 🍽️ Random featured recipe on the landing page
- 🔍 Search recipes by dish name or ingredient
- 📋 Full recipe detail with ingredients, instructions, and YouTube video
- 🧺 Leftovers mode — enter ingredients you have and find matching recipes

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS v3
- **Backend:** Node.js + Express
- **API:** TheMealDB (free tier)

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

1. Clone the repo
```bash
   git clone https://github.com/yourusername/SundayPrep.git
   cd SundayPrep
```

2. Install all dependencies
```bash
   npm install
   npm install --prefix client
   npm install --prefix server
```

3. Create a `.env` file in the root
```
   MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
   PORT=3001
```

4. Start the development server
```bash
   npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## Production Build
```bash
npm run build   # builds the React frontend
npm start       # serves everything from the Express server
```