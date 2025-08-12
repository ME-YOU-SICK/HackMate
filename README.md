# HackMate: Project Definition & Architecture

Welcome to the HackMate project definition. This document provides a comprehensive overview of the application's architecture, technology stack, and the purpose of each file and directory.

## 1. Project Overview

HackMate is a web application designed to be the central hub for hackathon participants and organizers. It solves the critical problem of team formation by allowing users to connect, form teams based on skills, and manage their event participation. It also provides tools for organizers to streamline event setup and management.

**Core Features:**
-   User authentication (Email/Password, Google, GitHub).
-   Onboarding flow for new users to build their profile.
-   User profiles showcasing skills, projects, and social links.
-   Event creation and management system using unique join codes.
-   A dedicated page for users to view and manage their joined events.
-   An intelligent, algorithm-based tool for finding and suggesting teammates from a user's network.
-   A multi-section, professional landing page to attract new users.

---

## 2. Technology Stack

HackMate is built with a modern, robust, and scalable tech stack:

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
-   **Form Handling:** Standard React form handling with Server Actions.
-   **Deployment:** Firebase App Hosting (or any Next.js compatible platform like Vercel).

---

## 3. Project Structure (File by File)

This section breaks down the project's directory structure and explains the role of each key file.

```
/
├── public/                 # Static assets (images, fonts, etc.) - Not currently used.
├── src/
│   ├── ai/                 # Genkit AI-related flows and configuration.
│   │   ├── flows/
│   │   └── genkit.ts       # Genkit initialization and configuration.
│   ├── app/                # Next.js App Router directory.
│   │   ├── (auth)/         # Route group for auth pages (login, signup).
│   │   ├── dashboard/      # Route group for protected dashboard pages.
│   │   │   ├── events/
│   │   │   ├── find-team/
│   │   │   ├── onboarding/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── actions/        # Server Actions for form submissions and mutations.
│   │   ├── globals.css     # Global styles and Tailwind CSS directives.
│   │   ├── layout.tsx      # Root layout for the entire application.
│   │   └── page.tsx        # The main landing/hero page.
│   ├── components/         # Reusable React components.
│   │   ├── ui/             # Core UI components from shadcn/ui.
│   │   └── animated-logo.tsx
│   │   └── dashboard-nav.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks.
│   │   └── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/                # Libraries, helpers, and utility functions.
│       ├── auth.ts         # Authentication logic (signup, login, etc.).
│       ├── data.tsx        # Static data for the app (roles, technologies).
│       ├── db.ts           # Firestore data models (interfaces) and helpers.
│       ├── firebase.ts     # Firebase initialization and configuration.
│       └── utils.ts        # Utility functions (e.g., `cn` for classnames).
├── .env                    # Environment variables (Firebase keys).
├── next.config.ts          # Next.js configuration file.
├── package.json            # Project dependencies and scripts.
└── tailwind.config.ts      # Tailwind CSS configuration.
```

### Key Directories Explained

#### `src/app`
This is the heart of the application, using the Next.js App Router.
-   **`layout.tsx`**: The root layout, wrapping all pages. It sets up the theme provider and toaster.
-   **`page.tsx`**: The public-facing landing page. It's a multi-section "SaaS-style" page designed to attract users.
-   **`globals.css`**: Defines global CSS variables for theming (light/dark mode) and contains all Tailwind CSS directives and custom animations.
-   **`(auth)` group**: Contains `login` and `signup` pages. This is a route group, meaning `/login` and `/signup` are top-level routes.
-   **`dashboard` directory**: Contains all pages that require authentication. The `layout.tsx` inside this directory implements the main sidebar navigation and protected content area.
-   **`actions` directory**: Contains all Next.js Server Actions. These are server-side functions that handle form submissions, database mutations (e.g., creating an event, joining an event), and other backend logic directly from client components, removing the need for separate API routes.

#### `src/components`
This directory houses all reusable React components.
-   **`ui/`**: This sub-directory contains the low-level UI components provided by `shadcn/ui` (e.g., `Button`, `Card`, `Input`). These are the building blocks of the application's interface.
-   **Other Components**: Higher-level components like `dashboard-nav.tsx` and `logo.tsx` are composed from the `ui` components to build specific parts of the application.

#### `src/lib`
This is the central hub for core application logic, configuration, and utilities.
-   **`firebase.ts`**: Contains the Firebase configuration and initializes the connection to Firebase services (Auth, Firestore).
-   **`auth.ts`**: A server-only file that encapsulates all authentication-related functions, such as signing up users, signing them in, processing provider logins, and creating user records in Firestore.
-   **`db.ts`**: Defines the TypeScript interfaces for our Firestore data structures (`UserProfile`, `Event`, `Notification`). It also contains helper functions for interacting with the database.
-   **`data.tsx`**: Holds static data used across the application, such as the predefined lists of roles and technologies for the "Find a Team" page.
-   **`utils.ts`**: A utility file, most notably for the `cn` function which merges Tailwind CSS classes intelligently.

#### `src/hooks`
This directory contains custom React hooks used for shared client-side logic.
-   **`use-toast.ts`**: A custom hook for managing and displaying toast notifications throughout the app.
-   **`use-mobile.ts`**: A simple hook to detect if the user is on a mobile device, allowing for responsive component rendering.
