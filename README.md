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
