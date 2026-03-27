# TaskFlow

A Kanban-style task management application built with React.

## Overview

TaskFlow lets users manage tasks across a Kanban board with drag-and-drop support. Each user has their own workspace — tasks are isolated per user account.

## Features

**Core**

- Login & Signup with JSON Server
- Kanban board with three columns (Todo, In Progress, Done)
- Create, edit and delete tasks
- Drag and drop tasks between columns

**Filters & Search**

- Search tasks by title
- Filter by status
- Filters persist in URL params

**Bonus**

- Dark / Light theme toggle
- Toast notifications on every action
- Skeleton loaders while fetching
- User-based task isolation
- Protected & public route guards

## Tech Stack

| Category      | Tech                           |
| ------------- | ------------------------------ |
| Framework     | React 18 + Vite                |
| Routing       | React Router v6 (object-based) |
| Server State  | TanStack React Query           |
| Forms         | React Hook Form                |
| Styling       | Tailwind CSS v4                |
| Drag & Drop   | @hello-pangea/dnd              |
| Mock API      | JSON Server                    |
| Notifications | react-hot-toast                |

## Default Mock Credentials :

Email: div@test.com
Password: password123

Run Mock JSON Backend : npx json-server --watch db.json --port 3001

Run Frontend in Dev mode : npm run dev

The app will load at http://localhost:5173 while the backend runs at http://localhost:3001.

[React](https://img.shields.io/badge/React-18-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![TanStack](https://img.shields.io/badge/TanStack-Query-ff4154)

---

## 🚀 Detailed Features

### 🔐 Authentication & Intelligent Routing :

- **Mock Authentication**: Powered by a local JSON Server. Authenticates emails and passwords.
- **Persistent Sessions**: User profile saved in `localStorage`. Page refreshes do not log the user out.
- **Route Guards**:
  - Unauthenticated users trying to access `/dashboard` are automatically redirected to `/login` (`ProtectedRoute`).
  - Authenticated users trying to access `/login`, `/signup`, or root `/` are immediately redirected to `/dashboard` (`PublicRoute`). No double-redirect flickering.

### 📋 Isolated Kanban Workspace :

- **User-Specific Tasks**: Workspace isolation. Tasks are tied to a `userId`. User A cannot see or edit tasks created by User B.
- **Drag & Drop Workspace**: Smooth drag-and-drop between Todo, In Progress, and Done columns using `@hello-pangea/dnd` (React 18 modern fork of Beautiful DnD).
- **Full CRUD flow**: Custom Modals for creating and editing tasks utilizing **React Hook Form**.

### 🔍 Advanced Search, Filtering, and URL Sync :

- **No Empty State Overkill**: If query parameters are empty, they are deleted automatically to keep URLs clean.
- **State persistence**: Filtering `?status=todo` or searching `?search=bug` modifies parameters in real-time. Bookmarking or hard-refreshing the URL brings the user back to the exact filtered view.

### 💅 Modern UI/UX Architecture :

- **Lazy Loading & Code Splitting**: All pages use standard React `lazy()` and `Suspense` mechanism to load only what is needed per route.
- **Memoization applied**: Functions and visual rendering elements run using `useCallback`, `useMemo`, and `React.memo` to trim re-renders.
- **Tailwind v4 dark mode**: A toggle that persists context visually using tailwind v4 class strategies with simple `custom-variant` injected.
- **Feedback & Loaders**:
  - Toasts via `react-hot-toast` for success contexts.
  - Skeletons utilizing tailwind `animate-pulse` during mock API delays.

---
