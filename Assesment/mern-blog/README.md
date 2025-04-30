# MERN Blog with File-Based Router

A minimal blog platform built using the MERN stack (MongoDB, Express, React, Node.js) featuring a custom file-based routing system on the frontend without using any third-party routing libraries.

## Project Structure

```
mern-blog/
├── client/ - Frontend React application
│   ├── src/
│   │   ├── pages/ - File-based routing structure
│   │   │   ├── index.jsx - Home page showing a list of posts
│   │   │   ├── 404.jsx - Not found page
│   │   │   └── posts/
│   │   │       ├── [id].jsx - Single post view
│   │   │       └── new.jsx - New post form
│   │   ├── router/ - Custom file-based router implementation
│   │   │   ├── fileMatcher.js - Converts URL paths to component file paths
│   │   │   └── RouterProvider.jsx - Router context and component
│   │   ├── styles/ - CSS styles for components
│   │   ├── App.jsx - Main application component
│   │   └── main.jsx - Application entry point
│   └── ...
├── server/ - Backend Express application
│   ├── models/ - Mongoose data models
│   │   └── Post.js - Blog post model
│   ├── routes/ - API routes
│   │   └── posts.js - Blog post routes
│   ├── server.js - Express server setup
│   └── ...
└── ...
```

## Features

- Custom file-based routing system (no react-router)
- Create, read, and list blog posts
- Responsive design with clean UI
- MongoDB data persistence
- RESTful API with Express

## Setup Instructions

### Prerequisites
- Node.js (≥ 18)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   ```
   *Note: If using MongoDB Atlas, replace the URI with your connection string.*

4. Start the server in development mode:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Implementation Details

### Custom Router

The application features a custom file-based routing system that:
- Maps URL paths to corresponding component files
- Handles dynamic routes (such as post IDs)
- Provides client-side navigation without page reloads
- Implements browser history for back/forward navigation

### File-Based Routing Pattern

- `/` → `src/pages/index.jsx`
- `/posts/:id` → `src/pages/posts/[id].jsx`
- `/posts/new` → `src/pages/posts/new.jsx`

## Time Constraints

This project was developed within a 6-hour timeframe as part of an assessment exercise.