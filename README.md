# NestJS URL Shortener

A URL shortener backend built using NestJS, Prisma, and PostgreSQL. The application allows users to shorten URLs, track analytics, and perform authentication using Google OAuth.

## Live Deployment
The backend is deployed at: [https://nest-url-shortener.onrender.com](https://nest-url-shortener.onrender.com)

## Features
- URL Shortening
- Redirect to original URLs
- Analytics tracking for shortened URLs
- Google OAuth-based authentication
- Session management

## Environment Variables
To run the application, create a `.env` file in the root directory with the following variables:

```env
# Database configuration
DATABASE_URL="your postgresql database uri"

# Session configuration
SESSION_SECRET=your-secret-session-key

# Google OAuth configuration
GOOGLE_CLIENT_ID=google-id
GOOGLE_CLIENT_SECRET=google-secret
REDIRECT_URL=YOUR-BACKEND-URL/auth/google/callback

# Application URLs
BASE_URL=http://localhost:3000
ALLOWED_ORIGIN= frontend-url-and-swagger-url-or-local-urls-LIKE-http://localhost:3000, http://localhost:4000
FRONTEND_URL=http://localhost:3001
```

## Prerequisites
- Node.js (v16+)
- PostgreSQL
- NestJS CLI

## Installation

1. Clone the repository:
   git clone <repository-url>
   cd <repository-folder>


2. Install dependencies:
   npm install


3. Set up the database:
   - Ensure PostgreSQL is running.
   - Update the `DATABASE_URL` in `.env` as needed.
   - Run the Prisma migrations:
     npx prisma migrate deploy/dev

4. Start the application:
   npm run start:dev

## API Documentation
The Swagger documentation is available at:
[http://localhost:3000/docs](http://localhost:3000/docs)
`For protected routes you need to add connect.sid cookie value to Authorize tab, on the doc's page first.`
`You have to login first in the browser and copy connect.sid from cookie and paste it on swagger page.`


## Usage
### Endpoints
### For example
#### 1. Shorten URL
- **POST** `/shorten`
- **Description**: Create a shortened URL.
- **Authentication**: Required

#### 2. Get URL Analytics
- **GET** `/analytics/:alias`
- **Description**: Retrieve analytics for a given alias.
- **Authentication**: Required

## Feature Addition
1. Fork the repository.
2. Install dependencies.
3. Set up local environment
4. Create Feature branch Feat/feature-name
5. Push the branch
6. Create pull request

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License
This project is licensed under the MIT License.

---

For further queries, contact [Kavit G. Patel](mailto:kvpatel.er@gmail.com).
