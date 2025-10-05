# Gemini Prompts for Building a Shipment Management Application from Scratch (Concise)

This document presents a sequence of concise prompts that is used in the development of the Shipment Management Application from its inception, leveraging the Gemini AI agent throughout the process. These prompts demonstrate a full development lifecycle, from initial setup to deployment and documentation.

---

## 1. Project Initialization and Basic Structure

**Prompt:**
```
Initialize a monorepo with a Node.js/Express backend and a Vite/React frontend.
```

**Context/Purpose:** Establish foundational project structure and core technologies.

**Expected Outcome:** `backend` (Express) and `frontend` (Vite/React) directories with `package.json` files.

---

## 2. Backend Database Integration

**Prompt:**
```
Integrate MongoDB with Mongoose in the backend; configure connection in `config/db.js` and connect via `server.js`.
```

**Context/Purpose:** Set up database connection for data persistence.

**Expected Outcome:** Mongoose installed, `db.js` configured, `server.js` connects to MongoDB using `.env` URI.

---

## 3. Frontend Routing Setup

**Prompt:**
```
Set up `react-router-dom` in `frontend/src/App.jsx` for Home, Login, and Register pages.
```

**Context/Purpose:** Enable client-side navigation and define initial routes.

**Expected Outcome:** `react-router-dom` installed, `App.jsx` configured, placeholder page components created.

---

## 4. Backend User Model and Registration

**Prompt:**
```
Create `User` model (`name`, `email`, `password`) in `backend/models/User.js`. Implement `POST /api/users` for user registration with password hashing and JWT return.
```

**Context/Purpose:** Define user data and implement new user account creation.

**Expected Outcome:** `User.js` model, `bcrypt.js`, `jsonwebtoken` installed, and functional `POST /api/users` endpoint.

---

## 5. Frontend User Registration Page

**Prompt:**
```
Implement `RegisterPage.jsx` form for user registration, integrating with `POST /api/users` and handling responses.
```

**Context/Purpose:** Provide UI for new user account creation and integrate with backend API.

**Expected Outcome:** Functional `RegisterPage.jsx` with form, API integration, and response handling.

---

## 6. Backend Authentication (Login and JWT Middleware)

**Prompt:**
```
Implement `POST /api/auth` for user login (validate credentials, return JWT). Create `auth.js` middleware to protect routes using JWT.
```

**Context/Purpose:** Enable user login and secure backend routes with JWT.

**Expected Outcome:** `POST /api/auth` endpoint for login, and `auth.js` middleware for JWT verification.

---

## 7. Frontend User Login Page

**Prompt:**
```
Implement `LoginPage.jsx` form for user login, integrating with `POST /api/auth` and handling responses.
```

**Context/Purpose:** Provide UI for existing user login and integrate with backend API.

**Expected Outcome:** Functional `LoginPage.jsx` with form, API integration, and response handling.

---

## 8. Backend Shipment Model and CRUD Routes

**Prompt:**
```
Create `Shipment` model (`user`, `description`, `status`, `isFragile`, `weight`, `shippingCost`, `totalCost` calculated) in `backend/models/Shipment.js`. Implement protected CRUD routes in `backend/routes/shipments.js`.
```

**Context/Purpose:** Define shipment data and implement API operations for management.

**Expected Outcome:** `Shipment.js` model with calculated `totalCost`, and protected CRUD endpoints in `shipments.js`.

---

## 9. Frontend Shipment Management Pages

**Prompt:**
```
Create `ShipmentsPage.jsx` to display, fetch, create, update, and delete user shipments. Include `ShipmentForm.jsx` for forms.
```

**Context/Purpose:** Provide comprehensive UI for authenticated users to manage shipments.

**Expected Outcome:** `ShipmentsPage.jsx` displaying shipments, `ShipmentForm.jsx` for forms, all integrated with backend API.

---

## 10. Frontend State Management with Redux Toolkit

**Prompt:**
```
Integrate Redux Toolkit. Create `authSlice.js` and `shipmentSlice.js` in `frontend/src/store/slices/`. Refactor API calls and state updates to use Redux.
```

**Context/Purpose:** Centralize and streamline frontend state management.

**Expected Outcome:** Redux Toolkit configured, slices created, frontend components refactored to use Redux.

---

## 11. Styling with Tailwind CSS

**Prompt:**
```
Integrate and configure Tailwind CSS in the frontend. Apply basic classes to key components.
```

**Context/Purpose:** Establish a utility-first CSS framework for consistent styling.

**Expected Outcome:** Tailwind CSS installed, configured, and basic styling applied.

---

## 12. Comprehensive API Documentation Generation

**Prompt:**
```
Generate comprehensive API documentation for the backend in `backend/API_DOCUMENTATION.md`.
```

**Context/Purpose:** Create a complete and professional reference for the backend API.

**Expected Outcome:** A detailed `API_DOCUMENTATION.md` file covering all backend endpoints.

---

## 13. Architecture Documentation Generation

**Prompt:**
```
Create high-level architecture documentation in `ARCHITECTURE.md`, including diagram, technologies, data flow, and structure.
```

**Context/Purpose:** Provide a holistic view of the application's design.

**Expected Outcome:** A comprehensive `ARCHITECTURE.md` file outlining the system's architecture.

---

## 14. Basic Testing Strategy and Setup

**Prompt:**
```
Outline a basic testing strategy for frontend and backend. Suggest Jest for both and provide initial setup steps.
```

**Context/Purpose:** Establish a foundation for ensuring code quality through automated testing.

**Expected Outcome:** Documented testing strategy and initial Jest setup for both frontend and backend.

---

## 15. Deployment Guidance

**Prompt:**
```
Provide high-level deployment guidance for the MERN stack application to a cloud platform.
```

**Context/Purpose:** Provide a roadmap for making the application accessible in production.

**Expected Outcome:** A document outlining general steps and considerations for deploying the MERN stack application.