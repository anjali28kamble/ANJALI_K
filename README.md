# 🚀 Anjali Kamble — Portfolio Website

A professional SPA portfolio built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📁 Project Structure

```
anjali-portfolio/
├── frontend/          ← React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── data.js          ← all resume data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── public/
│       ├── favicon.svg
│       └── resume.pdf       ← ADD YOUR RESUME HERE
└── backend/
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ → https://nodejs.org
- **MongoDB** (either local or MongoDB Atlas cloud)

---

## 🏃 Steps to Run

### Step 1 — Set up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community: https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (free cloud)**
1. Go to https://cloud.mongodb.com → create free cluster
2. Get your connection URI: `mongodb+srv://<user>:<pass>@cluster0.xxxx.mongodb.net/anjali_portfolio`

---

### Step 2 — Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env and set your MONGODB_URI if using Atlas
npm install
npm start
```
Backend runs at: http://localhost:5000

---

### Step 3 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

### Step 4 — (Optional) Add Your Resume PDF

Place your resume PDF at:
```
frontend/public/resume.pdf
```
The "Download CV" button will serve this file.

---

## ✅ Features

- 🎨 Deep blue glassmorphism design
- ⚛️  React + Vite SPA with smooth scroll
- 🌊 Particle field animation in hero
- ✍️  Typing animation (react-type-animation)
- 🃏 3D tilt cards on hover
- 📜 Scroll-triggered fade-in animations
- 📬 Contact form saves to MongoDB
- 📄 Resume download button
- 📱 Fully responsive

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/contact | Save contact form message |
| GET | /api/contact | View all messages (admin) |

---

Built with ❤️ for Anjali Kamble's portfolio
