# Design Document

## UI Layout

-------------------------------------------------
            Student Card System
-------------------------------------------------

+-------------------------+
| Name : Aarez            |
| Roll : 101              |
| Dept : AIML             |
| CGPA : 8.7              |
+-------------------------+

+-------------------------+
| Name : Rahul            |
| Roll : 102              |
| Dept : CSE              |
| CGPA : 8.2              |
+-------------------------+

## Components

### App Component

Responsibilities:

- Import student data
- Render StudentCard components
- Manage page layout

### StudentCard Component

Responsibilities:

- Display student details
- Receive data using props

### Students Data

Stores all student information in an array.

## Data Flow

students.js
     ↓
App.jsx
     ↓
StudentCard.jsx
     ↓
Display Student Information

## Design Principles

- Reusability
- Simplicity
- Readability
- Component-Based Architecture