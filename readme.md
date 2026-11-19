<div align="center">

# 🎓 Mohamed Sathak A.J. College of Engineering
### Student Card & Academic Performance System

An underrated, minimal, and high-performance **Student Card** web application designed with a monolithic frosted-obsidian aesthetic, glowing monogram initials, dynamic filtering, and complete CRUD capabilities.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![UI/UX](https://img.shields.io/badge/Aesthetic-Minimal_Obsidian_Dark-0F172A?style=flat-square)](#-design--uiux-highlights)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

</div>

## 📌 Overview

**Student Card** is a modern, component-driven React application developed for **Mohamed Sathak A.J. College of Engineering**. It provides a sleek, futuristic, and distraction-free interface for managing, searching, and inspecting student identity credentials, performance metrics (CGPA), and academic statuses.

The user experience merges **Neo-Swiss brutal-minimalism** with a **tactile dark obsidian canvas**, featuring a sub-pixel blueprint matrix grid, cursor-reactive ambient lighting, and glowing department-coded monograms.

---

## ✨ Features

### 🪪 Precision Monolithic Student Cards
- **Department-Glowing Monograms:** Replaced bulky photos with vibrant, department-coded initials avatars (`SR`, `AA`, `SN`, `YK`, `PS`, `AV`, `RK`, `AI`) backlit by radial glow accents.
- **Micro-Copy Roll Number Pill:** 1-click tactile copy button that morphs into a green checkmark and displays a brief `COPIED` notification badge.
- **Precision CGPA Metric Rail:** Clean numeric score display with an illuminated hairline progress track and gold `✦ HONORS` scholar badge for top performers ($\ge 9.0$).
- **Department Chromatic Identity:** Color-coded micro-status dots (Violet for AI & ML, Cyan for CS, Emerald for Data Science, Rose for Cyber Security, and Amber for ECE).

### ⚡ Interactive Management & CRUD
- **❤️ Like / Favorites:** Toggle favorites on any card with a glowing rose heart button and filter to view all favorited cards instantly.
- **➕ Enroll Student:** Add new students via a frosted-glass obsidian modal with real-time validation.
- **✏️ Edit Student:** Seamlessly update student names, roll numbers, departments, years, and CGPA scores.
- **🗑️ Delete Confirmation:** Dedicated safety modal with confirmation dialog to prevent accidental deletions.
- **💾 LocalStorage Persistence:** Edits, additions, deletions, and likes automatically persist across browser sessions.

### 🔍 Command Dock & Navigation
- **Instant Search:** Real-time search across student names, roll numbers, and departments.
- **Keyboard Shortcut:** Press `/` anywhere to instantly focus the search input.
- **Filter Chips:** Instant one-click filtering by Department and Favorites.
- **Smart Sorting:** Sort by **Top CGPA First**, **Name (A–Z)**, or **Roll Number**.
- **Live Counter:** Synchronized count display indicating currently filtered cards vs total enrolled cards.

---

## 🎨 Design & UI/UX Highlights

| Element | Description |
| :--- | :--- |
| **Canvas Background** | Deep space obsidian (`#07080b`) layered with an ultra-fine 32px blueprint dot grid. |
| **Ambient Luminescence** | Subtle pointer-reactive radial spotlight (`--mouse-x`, `--mouse-y`) paired with kinetic drift orbs. |
| **Frosted Glass Cards** | Glassmorphic obsidian tiles (`backdrop-filter: blur(20px)`) with 1px translucent borders and department accents. |
| **Typography** | Contemporary pairings: **Outfit** for headings, **Plus Jakarta Sans** for body UI, and **Space Mono** for roll numbers & metrics. |

---

## 📁 Project Structure

```text
Student-Card/
├── public/                 # Static assets & favicons
├── src/
│   ├── components/         # Reusable React components
│   │   ├── DeleteModal.jsx # Delete confirmation dialog
│   │   ├── Footer.jsx      # Minimalist institution footer
│   │   ├── Header.jsx      # Top brand bar with live counters
│   │   ├── Icons.jsx       # Curated zero-dependency SVG icons
│   │   ├── SearchBar.jsx   # Floating command dock with filters & sort
│   │   ├── StudentCard.jsx # Monolithic obsidian student card
│   │   ├── StudentList.jsx # Responsive cards grid & empty state
│   │   └── StudentModal.jsx# Glassmorphic Add/Edit modal dialog
│   ├── data/
│   │   └── students.js     # Initial student dataset & department lists
│   ├── App.css             # Obsidian canvas & ambient aurora styling
│   ├── App.jsx             # Root component & state management
│   ├── index.css           # Global CSS reset & typography tokens
│   └── main.jsx            # React 19 application entry point
├── index.html              # HTML5 entry with metadata
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aarezashhar-tech/Student-Card.git
   cd Student-Card
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint the codebase:**
   ```bash
   npm run lint
   ```

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** Pure Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Backdrop Filters, Keyframe Animations)
- **Icons:** Custom Optimized Inlined SVGs
- **Typography:** Google Fonts (*Outfit*, *Plus Jakarta Sans*, *Space Mono*)
- **Code Quality:** ESLint

---

## 👨‍💻 Author

Developed for **Mohamed Sathak A.J. College of Engineering** by **[Aarez Ashhar](https://github.com/aarezashhar-tech)**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
