# MERN Task Manager (Dockerized)

## Tech Stack

This boilerplate leverages the following technologies:

- MongoDB – NoSQL database for storing user credentials securely.
- Express.js – Backend framework to handle authentication routes and API requests.
- React.js – Frontend library for creating a responsive and interactive UI.
- Node.js – Runtime environment for executing JavaScript on the server.
- Redux Toolkit – State management for handling authentication and global app state.
- Tailwind CSS – Utility-first CSS framework for efficient and responsive styling.
- TanStack Table – Advanced table component for dynamic data display, in-cell editing, and CRUD operations.
- ShadCN – Component library for building modern and accessible forms with Tailwind CSS.
- React Hook Form – Lightweight library for form handling and validation.
- Yup – Schema validation library for enforcing form validation rules.
- Docker – Containerized deployment for a consistent and scalable development environment.

## Features

- User Registration and Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes Implementation
- Token Expiry Handling
- Global State Management with Redux
- Tailwind CSS for efficient and reusable styling.
- ShadCN components for intuitive and accessible forms.
- CRUD Operations with TanStack Table
  - Dynamic Data Table: Display, search, and filter data efficiently.
  - In-Cell Editing: Editable cells supporting direct text input and selection-based options.
  - Add, Edit & Delete Users:
    - Forms built with ShadCN, React Hook Form, and Yup validation.
    - Client-side validation with Yup schema enforcement.
    - Form submission with React Hook Form for optimized performance.
    - Seamless integration with Redux for state updates.

## Task Management

- Dashboard: Overview of tasks, stats, and team performance

- Tasks Page:

  - View in Board or List
  - Add, edit, delete, and move tasks between statuses
  - Search, filter, and sort tasks efficiently

- Todo Page:

  - Toggle completion status
  - Add, edit, delete todos
  - Assign todo to team members
  - View in Board or List
  - Search, filter, and sort todo efficiently

- Team Member Management:

  - Add, edit, remove team members
  - Assign roles and permissions
  - View in Board or List
  - Search, filter, and sort team members efficiently

## Data Handling & Deployment

- Dockerized Project:

  - The entire application runs in Docker containers for seamless development and deployment.
  - Includes Docker Compose for managing frontend, backend, and database services.

- Database Seeding:

  - The database can be prepopulated with sample tasks, todos, and team members for testing and initial setup.
  - To seed the database, follow these steps:
    1. Navigate to the backend directory in your terminal:
       ```bash
       cd backend
       ```
    2. Run the seed script using Node.js:
       ```bash
       node seed/index.js
       ```
  - This will populate the database with predefined sample data, ensuring a ready-to-use environment for development and testing.

## Public

- Visit [tms.bernardev.com](https://tms.bernardev.com) to experience the full capabilities of the Task Management System.
