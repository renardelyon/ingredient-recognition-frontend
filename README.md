# Ingredients Recognition Frontend

A React application that allows users to upload photos of ingredients, recognize them using AI, and get recipe recommendations.

## Features

- 📷 **Image Upload**: Upload photos of your ingredients
- 🔍 **Ingredient Recognition**: AI-powered ingredient detection with confidence scores
- 📋 **Ingredient Selection**: Choose which detected ingredients to use for recipes
- 🍳 **Recipe Recommendations**: Get personalized recipe suggestions based on your ingredients
- 💾 **Save Recipes**: Bookmark your favorite recipes for later
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Query** for server state management
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `VITE_API_BASE_URL` in `.env` to point to your backend service
