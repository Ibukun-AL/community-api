# Community API

This project is a NestJS application that provides an API for managing a community platform. It includes features such as user authentication, post management, comments, and categories.

## Features

- User authentication with JWT
- CRUD operations for users, posts, comments, and categories
- Sorting and filtering of posts
- API documentation using Swagger

## Getting Started

Follow these steps to set up and run the application on your local machine:

### Prerequisites

- Node.js (>= 18.x)
- PostgreSQL
- A .env file or environment variables for database configuration

### Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/your-username/community-api.git
   cd community-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_HOST=your-database-host
   DATABASE_PORT=5432
   DATABASE_USERNAME=your-database-username
   DATABASE_PASSWORD=your-database-password
   DATABASE_NAME=your-database-name
   JWT_SECRET=your-jwt-secret
   ```

4. Run database migrations (if applicable):

   ```bash
   npm run typeorm migration:run
   ```

5. Start the application:

   ```bash
   npm run start
   ```

The application will be running on `http://localhost:3000`.

### API Endpoints

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Log in and obtain a JWT token
- **GET /posts**: Get a list of posts (with optional sorting and filtering)
- **POST /posts**: Create a new post
- **GET /posts/:id**: Get a post by ID
- **PUT /posts/:id**: Update a post
- **DELETE /posts/:id**: Delete a post
- **POST /comments**: Create a new comment
- **GET /comments/:postId**: Get comments for a post
- **GET /categories**: Get a list of categories
- **POST /categories**: Create a new category

### Testing

You can test the API endpoints using Postman or any other API client. Make sure to include the `Authorization` header with the JWT token for protected routes.

### API Documentation

The API documentation is available at `http://localhost:3000/api`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
