# 🥗 NourishAI

An AI-powered nutrition tracking web application that helps users log meals, track macros, and stay on top of their calorie deficit goals.

## Features

- 📊 **Nutrition Dashboard** — Daily summary of calories, protein, carbs, and fat
- 🍽️ **Meal Logging** — Fixed meal slots for Breakfast, Lunch, Snack, and Dinner
- ➕ **Quick Add Food** — Add food items to any meal directly from the dashboard
- 🔐 **Authentication** — Secure JWT-based login and registration
- ⌚ **Apple Watch Integration** *(coming soon)* — Import activity and calorie burn data

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- React Router

### Backend
- ASP.NET Core (C#)
- SQL Server
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- SQL Server

### Frontend Setup
```bash
cd nourish-ai-frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd nourish-ai-backend
dotnet restore
dotnet run
```

### Environment Variables

Create a `.env` file in `nourish-ai-frontend/`:
