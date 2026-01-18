# 📸 Snapgram – Full Stack Social Media Application

Snapgram is a modern **full-stack social media application** built with a **React + TypeScript frontend** and a **Node.js + Express backend**, designed for creating, exploring, and interacting with posts in a smooth and scalable way.

This project focuses on clean architecture, reusable components, and real-world authentication and data handling patterns.

---

## 📋 Table of Contents

1. Introduction  
2. Tech Stack  
3. Features  
4. Project Structure  
5. Getting Started  
6. Environment Variables  
7. Scripts  
8. Future Enhancements  

---

## 🤖 Introduction

Snapgram allows users to:
- Create and explore posts
- Like and save content
- Manage profiles
- Experience fast data fetching with caching
- Enjoy a responsive, modern UI

The project is built as a **separate frontend and backend setup**, making it scalable and production-ready.

---

## ⚙️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- TanStack React Query
- Tailwind CSS
- ShadCN UI
- React Hook Form + Zod
- Radix UI
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- dotenv
- CORS

---

## 🔋 Features

### Core Features
- User authentication (JWT-based)
- Create, edit, and delete posts
- Like and save posts
- User profile management
- Browse other users
- Responsive UI with mobile-first design

### Frontend Features
- React Query for caching & background refetching
- Infinite scrolling support
- Debounced search
- Drag-and-drop file upload
- Modular and reusable components

### Backend Features
- RESTful API architecture
- Secure password hashing
- Token-based authorization
- MongoDB schema modeling
- Clean folder structure

---

## 🗂 Project Structure

```text
social_media_app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── server.js
│   └── package.json
│
└── README.md

## Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** (v18+ recommended)
- **npm**
- **MongoDB** (local or cloud)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run at: `http://localhost:5000`

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

No secrets are exposed directly. API base URL should be configured in a constants/config file.

---

## 📜 Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
npm run dev      # Start backend with nodemon
```

---

## 🧠 Development Notes

- Frontend and backend are intentionally decoupled
- `.env` files are excluded from version control
- Designed to be easily extended with:
  - Cloud storage
  - Notifications
  - Realtime updates
  - Role-based access

---

## 🚀 Future Enhancements

- Comment system
- Follow / unfollow users
- Image optimization
- Deployment (Docker / Cloud)
- Real-time notifications
- Admin dashboard

---

## 📄 License

This project is licensed under the MIT License.