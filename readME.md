# Task Management API with Authentication

## Overview

The Task Management API is a web service that provides functionalities for managing tasks. Users need to log in to access and manage their tasks.

## Key Features

### 1. User Authentication

-   **Endpoint:** `POST /auth/login`
-   **Request:** Send login information (email and password).
-   **Response:** Returns a token upon successful login.

### 2. Create Task

-   **Endpoint:** `POST /tasks`
-   **Request:** Send the authentication token in the header and JSON data containing information for the new task.
-   **Response:** Returns information about the created task.

### 3. Read Tasks

-   **Endpoint:** `GET /tasks`
-   **Request:** Send the authentication token in the header.
-   **Response:** Returns a list of all available tasks.

### 4. Read Task Detail

-   **Endpoint:** `GET /tasks/:taskId`
-   **Request:** Send the authentication token in the header.
-   **Response:** Returns detailed information about a specific task.

### 5. Update Task

-   **Endpoint:** `PUT /tasks/:taskId`
-   **Request:** Send the authentication token in the header and JSON data containing update information.
-   **Response:** Returns information about the updated task.

### 6. Delete Task

-   **Endpoint:** `DELETE /tasks/:taskId`
-   **Request:** Send the authentication token in the header.
-   **Response:** Returns a confirmation of task deletion.

## Authentication and Access Control

-   The API requires authentication with a token to perform task management operations.
-   Users need to log in to receive a token and have access rights based on their roles.

## Directory Structure

-   📁 **api-management-task**
    -   📁 **src**
        -   📁 **controllers**
            -   📄 taskController.js
            -   📄 userController.js
        -   📁 **models**
            -   📄 taskModel.js
            -   📄 userModel.js
        -   📁 **routes**
            -   📄 taskRoutes.js
            -   📄 userRoutes.js
        -   📄 **app.js**
    -   📁 **config**
        -   📄 databaseConfig.js
        -   📄 authenticationConfig.js
    -   📁 **test**
        -   📄 taskController.test.js
        -   📄 taskRoutes.test.js
        -   📄 userController.test.js
        -   📄 userRoutes.test.js
    -   📄 **package.json**
    -   📄 **README.md**

## Usage Guide

1. Log in to receive the authentication token.
2. Use the token to perform API requests.

---

**Conclusion:** The Task Management API provides flexible and secure task management functionalities, requiring authentication for enhanced security and user management.

---
**Library I'm used**

### 1. Express.js

-   **Installation:** `npm install express`
-   **Role:** Express.js is a powerful Node.js web framework used to build and manage routes, middleware, and handle HTTP requests.

### 2. Mongoose

-   **Installation:** `npm install mongoose`
-   **Role:** Mongoose is a library that facilitates interaction with MongoDB databases, allowing you to define data models and perform queries.

### 3. jsonwebtoken

-   **Installation:** `npm install jsonwebtoken`
-   **Role:** jsonwebtoken is used to create and authenticate JSON Web Tokens (JWT), providing user authentication for secure API access.

### 4. dotenv

-   **Installation:** `npm install dotenv`
-   **Role:** dotenv helps read environment variables from the `.env` file, simplifying the management of application configurations.

### 5. bcrypt.js

-   **Installation:** `npm install bcrypt`
-   **Role:** bcrypt.js is a library for securing user passwords using the bcrypt algorithm, enhancing security for user authentication.

### 6. Joi

-   **Installation:** `npm install joi`
-   **Role:** Joi is a library for data validation and verification, especially useful when handling user input to ensure data integrity.

### 7. morgan

-   **Installation:** `npm install morgan`
-   **Role:** morgan is middleware that logs HTTP requests, aiding in development and monitoring activities.

### 8. jest and supertest

-   **Installation:** `npm install jest supertest`
-   **Role:** jest and supertest are used for writing unit tests and integration tests to ensure the robustness and reliability of the application.
