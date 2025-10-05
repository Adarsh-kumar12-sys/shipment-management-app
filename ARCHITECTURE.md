# Architecture Documentation for Shipment Management Application

This document outlines the high-level architecture of the Shipment Management Application, which is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## 1. High-Level Overview

The application follows a client-server architecture, where the frontend (client) interacts with the backend (server) to manage shipment data. The backend, in turn, communicates with a MongoDB database for data persistence.

```
+-----------------+
|     Frontend    |
|   (React App)   |
+--------+--------+
         |
         | HTTP/REST API Calls
         |
+--------+--------+
|     Backend     |
| (Node.js/Express)|
+--------+--------+
         |
         | MongoDB Driver / Mongoose
         |
+--------+--------+
|     Database    |
|    (MongoDB)    |
+-----------------+
```

## 2. Technologies Used

### 2.1 Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Redux Toolkit:** For efficient state management across the application.
*   **React Router DOM:** For client-side routing.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **Tailwind CSS:** A utility-first CSS framework for styling.
*   **Vite:** A fast build tool for modern web projects.

### 2.2 Backend

*   **Node.js:** A JavaScript runtime for server-side development.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **MongoDB:** A NoSQL document database.
*   **JSON Web Token (JWT):** For user authentication and authorization.
*   **Bcrypt.js:** For hashing passwords.
*   **Express Validator:** For request body validation.
*   **Dotenv:** For loading environment variables.

## 3. Data Flow and Interactions

1.  **User Interaction (Frontend):** The user interacts with the React-based frontend, triggering actions (e.g., logging in, creating a shipment, viewing shipments).
2.  **API Calls (Frontend to Backend):** These actions dispatch Redux actions, which in turn make asynchronous HTTP requests (using Axios) to the backend API endpoints.
3.  **Request Handling (Backend):** The Express.js backend receives these requests. Middleware (e.g., authentication, validation) processes the requests before they reach the route handlers.
4.  **Database Operations (Backend to Database):** Route handlers interact with Mongoose models to perform CRUD (Create, Read, Update, Delete) operations on the MongoDB database.
5.  **Response (Backend to Frontend):** The backend sends a JSON response back to the frontend, indicating the success or failure of the operation and any relevant data.
6.  **State Update (Frontend):** The frontend receives the response, updates the Redux store, and re-renders the UI accordingly.

## 4. Backend Structure

The backend is organized into the following directories:

*   **`config/`**: Contains configuration files, such as `db.js` for MongoDB connection.
*   **`middleware/`**: Houses Express middleware functions, like `auth.js` for JWT authentication.
*   **`models/`**: Defines Mongoose schemas and models for database entities (e.g., `User.js`, `Shipment.js`).
*   **`routes/`**: Contains API route definitions, separating concerns for different resources (e.g., `auth.js`, `users.js`, `shipments.js`). Each route file defines endpoints and links them to corresponding logic.
*   **`server.js`**: The main entry point of the backend application, responsible for setting up the Express server, connecting to the database, and mounting routes.

## 5. Frontend Structure

The frontend is organized into the following directories within `src/`:

*   **`api.js`**: Centralized file for Axios instance and API request configurations.
*   **`assets/`**: Stores static assets like images.
*   **`components/`**: Reusable React components (e.g., `Navbar.jsx`, `ShipmentForm.jsx`, `Layout.jsx`).
*   **`pages/`**: Top-level components representing different views or pages of the application (e.g., `HomePage.jsx`, `LoginPage.jsx`, `ShipmentsPage.jsx`).
*   **`store/`**: Contains Redux Toolkit setup, including:
    *   **`store.js`**: Configures the Redux store.
    *   **`slices/`**: Contains Redux slices, each managing state and actions for a specific feature (e.g., `authSlice.js`, `shipmentSlice.js`). It also includes `authActions.js` and `shipmentActions.js` for asynchronous logic.
*   **`utils/`**: Utility functions, such as `toastStyles.js` for styling notifications.
*   **`App.jsx`**: The root component that sets up routing and global layouts.
*   **`main.jsx`**: The entry point for the React application, rendering the `App` component.

## 6. Authentication Flow

1.  **User Registration/Login:** User provides credentials to the frontend.
2.  **API Request:** Frontend sends credentials to `/api/users` (register) or `/api/auth` (login).
3.  **Token Generation:** Backend validates credentials, generates a JWT, and sends it back to the frontend.
4.  **Token Storage:** Frontend stores the JWT (e.g., in local storage).
5.  **Authenticated Requests:** For protected routes, the frontend includes the JWT in the `x-auth-token` header.
6.  **Token Verification:** Backend's `auth` middleware verifies the JWT, extracts user information, and attaches it to the request object (`req.user`).
7.  **Access Control:** Route handlers use `req.user` to ensure the authenticated user has permission to perform the requested action.
