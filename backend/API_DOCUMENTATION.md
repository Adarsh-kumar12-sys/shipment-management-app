# API Documentation for Shipment Management Application
Login credential for evaluation
email- adarshpandey9910@gmail.com
password- 1234567

This document provides a comprehensive overview of the RESTful API for the Shipment Management Application.

## Base URL

The base URL for all API endpoints would be `http://localhost:5000/api` or a similar address depending on the server configuration.

## Authentication

Authentication is handled using JSON Web Tokens (JWT). To access protected routes, a user must first register and then log in to obtain a token. This token must then be included in the `x-auth-token` header of all subsequent requests to protected routes.

### Obtaining a Token

*   **Registration:** After successful registration, a JWT token is returned.
*   **Login:** After successful login, a JWT token is returned.

### Using the Token

Include the token in the request header:

`x-auth-token: <YOUR_JWT_TOKEN>`

## Endpoints

---

### 1. Authentication Endpoints

#### 1.1 Register a User

*   **URL:** `/api/users`
*   **Method:** `POST`
*   **Description:** Registers a new user in the system.
*   **Access:** Public
*   **Request Body:**
    ```json
    {
        "name": "Adarsh Kumar",
        "email": "adarshpandey9910@gmail.com",
        "password": "1234567"
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
        "errors": [
            {
                "msg": "Name is required"
            }
        ]
    }
    ```
    ```json
    {
        "msg": "User already exists"
    }
    ```

#### 1.2 Login User

*   **URL:** `/api/auth`
*   **Method:** `POST`
*   **Description:** Authenticates a user and returns a JWT token.
*   **Access:** Public
*   **Request Body:**
    ```json
    {
        "email": "adarshpandey9910@gmail.com",
        "password": "1234567"
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
        "errors": [
            {
                "msg": "Please include a valid email"
            }
        ]
    }
    ```
    ```json
    {
        "msg": "Invalid Credentials"
    }
    ```

#### 1.3 Get Authenticated User

*   **URL:** `/api/auth`
*   **Method:** `GET`
*   **Description:** Retrieves the details of the currently authenticated user.
*   **Access:** Private (Requires JWT token)
*   **Response (Success - 200 OK):**
    ```json
    {
        "_id": "60c72b2f9b1e8c001c8e4a1a",
        "name": "Adarsh Kumar",
        "email": "adarshpandey9910@gmail.com",
        "date": "2023-10-26T10:00:00.000Z",
        "__v": 0
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
        "msg": "Token is not valid"
    }
    ```

---

### 2. Shipment Endpoints

#### 2.1 Create a Shipment

*   **URL:** `/api/shipments`
*   **Method:** `POST`
*   **Description:** Creates a new shipment for the authenticated user.
*   **Access:** Private (Requires JWT token)
*   **Request Body:**
    ```json
    {
        "description": "Electronics order",
        "status": "Pending",
        "isFragile": true,
        "weight": 2.5,
        "shippingCost": 15.00
    }
    ```
    *   `description` (String, required): A brief description of the shipment.
    *   `status` (String, optional): The current status of the shipment. Allowed values: "Pending", "In Transit", "Delivered", "Cancelled". Defaults to "Pending".
    *   `isFragile` (Boolean, optional): Indicates if the shipment is fragile. Defaults to `false`.
    *   `weight` (Number, required): The weight of the shipment in appropriate units.
    *   `shippingCost` (Number, required): The base cost for shipping.
*   **Response (Success - 200 OK):**
    ```json
    {
        "_id": "60c72b2f9b1e8c001c8e4a1b",
        "user": "60c72b2f9b1e8c001c8e4a1a",
        "description": "Electronics order",
        "status": "Pending",
        "isFragile": true,
        "weight": 2.5,
        "shippingCost": 15.00,
        "totalCost": 16.50,
        "createdAt": "2023-10-26T10:00:00.000Z",
        "__v": 0
    }
    ```
    *   `totalCost` is calculated automatically: `shippingCost` + 10% if `isFragile` is `true`.
*   **Response (Error - 500 Server Error):**
    ```json
    {
        "msg": "Server Error"
    }
    ```

#### 2.2 Get All Shipments for a User

*   **URL:** `/api/shipments`
*   **Method:** `GET`
*   **Description:** Retrieves all shipments associated with the authenticated user, with pagination, filtering, and search capabilities.
*   **Access:** Private (Requires JWT token)
*   **Query Parameters:**
    *   `page` (optional): Page number for pagination (default: 1)
    *   `limit` (optional): Number of items per page (default: 4)
    *   `status` (optional): Filter shipments by status (e.g., "Pending", "In Transit", "Delivered", "Cancelled")
    *   `keyword` (optional): Search shipments by description (case-insensitive regex)
*   **Response (Success - 200 OK):**
    ```json
    {
        "totalShipments": 10,
        "totalPages": 3,
        "currentPage": 1,
        "shipments": [
            {
                "_id": "60c72b2f9b1e8c001c8e4a1b",
                "user": "60c72b2f9b1e8c001c8e4a1a",
                "description": "Electronics order",
                "status": "Pending",
                "isFragile": true,
                "weight": 2.5,
                "shippingCost": 15.00,
                "totalCost": 16.50,
                "createdAt": "2023-10-26T10:00:00.000Z",
                "__v": 0
            },
            // ... more shipment objects
        ],
        "next": {
            "page": 2,
            "limit": 4
        }
    }
    ```
*   **Response (Error - 500 Server Error):**
    ```json
    {
        "msg": "Server Error"
    }
    ```

#### 2.3 Update a Shipment

*   **URL:** `/api/shipments/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing shipment by its ID. The authenticated user must own the shipment.
*   **Access:** Private (Requires JWT token)
*   **URL Parameters:**
    *   `id` (required): The ID of the shipment to update.
*   **Request Body:**
    ```json
    {
        "status": "In Transit",
        "isFragile": false,
        "shippingCost": 20.00
    }
    ```
    *   `description` (String, optional): A brief description of the shipment.
    *   `status` (String, optional): The current status of the shipment. Allowed values: "Pending", "In Transit", "Delivered", "Cancelled".
    *   `isFragile` (Boolean, optional): Indicates if the shipment is fragile.
    *   `weight` (Number, optional): The weight of the shipment in appropriate units.
    *   `shippingCost` (Number, optional): The base cost for shipping.
*   **Response (Success - 200 OK):**
    ```json
    {
        "_id": "60c72b2f9b1e8c001c8e4a1b",
        "user": "60c72b2f9b1e8c001c8e4a1a",
        "description": "Electronics order",
        "status": "In Transit",
        "isFragile": false,
        "weight": 2.5,
        "shippingCost": 20.00,
        "totalCost": 20.00,
        "createdAt": "2023-10-26T10:00:00.000Z",
        "__v": 0
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
        "msg": "Shipment not found"
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
        "msg": "Not authorized"
    }
    ```
*   **Response (Error - 500 Server Error):**
    ```json
    {
        "msg": "Server Error"
    }
    ```

#### 2.4 Delete a Shipment

*   **URL:** `/api/shipments/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a shipment by its ID. The authenticated user must own the shipment.
*   **Access:** Private (Requires JWT token)
*   **URL Parameters:**
    *   `id` (required): The ID of the shipment to delete.
*   **Response (Success - 200 OK):**
    ```json
    {
        "msg": "Shipment removed"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
        "msg": "Shipment not found"
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
        "msg": "Not authorized"
    }
    ```
*   **Response (Error - 500 Server Error):**
    ```json
    {
        "msg": "Server Error"
    }
    ```
