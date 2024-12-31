# Blog List Application

This project is a blog list application built as part of the Full Stack Open course, Part 4. It provides a RESTful API for managing blog posts with user authentication.

## Features

- Blog management (CRUD operations)
- User authentication and authorization
- Token-based security
- MongoDB database integration
- Comprehensive test suite

## Technologies

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Jest for testing
- Supertest for API testing
- bcrypt for password hashing

## Project Structure

bloglist/
├── controllers/
│ ├── blogs.js
│ ├── users.js
│ └── login.js
├── models/
│ ├── blog.js
│ └── user.js
├── utils/
│ ├── config.js
│ ├── logger.js
│ ├── middleware.js
│ └── list_helper.js
├── tests/
│ ├── blog_api.test.js
│ ├── user_api.test.js
│ ├── list_helper.test.js
│ └── test_helper.js
├── app.js
├── index.js
└── package.json

## API Endpoints

### Blogs
- GET `/api/blogs` - Get all blogs
- POST `/api/blogs` - Create a new blog (authentication required)
- DELETE `/api/blogs/:id` - Delete a blog (authentication required)
- PUT `/api/blogs/:id` - Update a blog

### Users
- GET `/api/users` - Get all users
- POST `/api/users` - Create a new user

### Authentication
- POST `/api/login` - Login and receive authentication token

## Setup and Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
Create a .env file in the root directory with the following variables:

MONGODB_URI=your_mongodb_production_uri
TEST_MONGODB_URI=your_mongodb_test_uri
PORT=3003
SECRET=your_jwt_secret
Run the application:
BASH

# Development mode
npm run dev

# Production mode
npm start

# Run tests
npm test
Testing
The application includes comprehensive tests for:

Helper functions
Blog API endpoints
User management
Authentication and authorization
Run tests with:

BASH

npm test
Error Handling
The application includes centralized error handling for:

Validation errors
Authentication errors
Database errors
Malformed requests
Authentication
The application uses JWT tokens for authentication. To access protected endpoints:

Login to receive a token
Include the token in subsequent requests in the Authorization header:

Authorization: Bearer <token>
Contributing
This project is part of the Full Stack Open course curriculum. Feel free to use it as a reference for your own studies.

License
This project is licensed under the MIT License.