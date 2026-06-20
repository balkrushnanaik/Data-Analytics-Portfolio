# 🚀 Balkrushna Naik — Data Analyst Portfolio

> A world-class 3D space-themed portfolio built with React + Three.js + Flask

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Flask](https://img.shields.io/badge/Flask-3.0-green) ![Three.js](https://img.shields.io/badge/Three.js-0.167-black) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## 📁 Project Structure

```
balkrushna-portfolio/
├── frontend/                   ← React + Vite + Three.js
│   ├── public/
│   │   ├── profile.jpg         ← ⚠️ ADD YOUR PHOTO HERE
│   │   ├── resume.pdf          ← ⚠️ ADD YOUR RESUME HERE
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx        ← 3D Earth + typing animation
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx      ← Infinite carousel + bars
│   │   │   ├── Projects.jsx    ← Filterable project grid
│   │   │   ├── Experience.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Contact.jsx     ← Form → Flask API
│   │   │   ├── Footer.jsx
│   │   │   ├── StarField.jsx   ← Canvas star animation
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           ← All styles + animations
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                    ← Python Flask API
│   ├── api/
│   │   └── index.py            ← Vercel serverless entry
│   ├── static/
│   │   └── resume.pdf          ← Served via /api/resume
│   ├── app.py                  ← Main Flask application
│   ├── requirements.txt
│   └── vercel.json
│
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### 1. Clone & setup

```bash
git clone https://github.com/YOUR_USERNAME/balkrushna-portfolio.git
cd balkrushna-portfolio
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

### 3. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py               # → http://localhost:5000
```

---

## 🎯 Customization Checklist

### Personal info (update these files):
- [ ] `frontend/public/profile.jpg` — Your professional photo (400×400px recommended)
- [ ] `frontend/public/resume.pdf` — Your latest resume
- [ ] `backend/static/resume.pdf` — Same resume for API download
- [ ] `frontend/src/components/About.jsx` — Update personal story
- [ ] `frontend/src/components/Contact.jsx` — Update email and social links
- [ ] `frontend/src/components/Footer.jsx` — Update GitHub and LinkedIn URLs
- [ ] `frontend/src/components/Projects.jsx` — Add real GitHub/demo links
- [ ] `frontend/index.html` — Update OG meta tags and URL

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build               # Creates dist/ folder

# Using Vercel CLI
npm i -g vercel
vercel login
vercel --prod               # Follow prompts, root = frontend/
```

**Vercel settings:**
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

### Backend → Vercel (Serverless)

```bash
cd backend
vercel login
vercel --prod               # Root = backend/
```

Set environment variable in Vercel dashboard:
- `ADMIN_SECRET` = your_secret_key (to access contact list endpoint)

### After deployment:

Update `vite.config.js` proxy target to point to your deployed backend URL:

```js
proxy: {
  '/api': {
    target: 'https://your-backend.vercel.app',
    ...
  }
}
```

Or update the fetch URLs in `Contact.jsx` to use the full backend URL.

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | All projects |
| GET | `/api/skills` | Skills by category |
| GET | `/api/certifications` | All certifications |
| GET | `/api/education` | Education history |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/resume` | Download resume PDF |
| GET | `/api/contacts?secret=KEY` | Admin: view all messages |

### POST `/api/contact` — Request Body

```json
{
  "name": "Recruiter Name",
  "email": "recruiter@company.com",
  "subject": "Data Analyst Opportunity",
  "message": "We'd love to discuss an opportunity..."
}
```

---

## 🎨 Theme Customization

Edit CSS variables in `frontend/src/index.css`:

```css
:root {
  --space-black: #050816;     /* Page background */
  --space-dark: #0F172A;      /* Dark sections */
  --neon-blue: #00D4FF;       /* Primary accent */
  --neon-purple: #8B5CF6;     /* Secondary accent */
  --neon-cyan: #06FFA5;       /* Success / highlight */
  --neon-pink: #FF006E;       /* Error / emphasis */
}
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| 3D Interactive Earth (Three.js) | ✅ |
| Animated Star Field (Canvas) | ✅ |
| Typing Animation | ✅ |
| Infinite Skill Carousel | ✅ |
| Filterable Project Grid | ✅ |
| Glassmorphism Cards | ✅ |
| Neon Effects | ✅ |
| Custom Cursor Glow | ✅ |
| Scroll Progress Bar | ✅ |
| Loading Screen | ✅ |
| Back to Top Button | ✅ |
| Mobile Responsive | ✅ |
| SEO Optimized | ✅ |
| Contact Form + DB | ✅ |
| Resume Download API | ✅ |
| Framer Motion Animations | ✅ |
| Scroll-triggered reveals | ✅ |

---

## 📞 Support

Built by and for Balkrushna Naik. For questions, open an issue on GitHub.

---

*Deployed on Vercel · Built with React + Flask + Three.js*
