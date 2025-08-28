Personal URL Shortener
This project is the backend for a full-stack URL shortening service, built with a focus on performance, scalability, and persistence. Unlike simple tutorial projects, this backend is architecturally sound, utilizing a proper database for permanent data storage and a caching layer to handle high traffic efficiently.

Key Features
Persistent Storage: Uses MongoDB to store all shortened URLs, ensuring data is never lost, even on server restarts.

High-Performance Caching: Implements a Redis caching layer to serve frequently accessed URLs, drastically reducing database queries and ensuring sub-100ms redirect response times.

Scalable Architecture: Designed to handle a large volume of redirects efficiently by prioritizing cache hits and minimizing database load.

Clean API: Provides a simple, RESTful API for both creating and redirecting shortened links.

Containerization Ready: Configured to be easily containerized and deployed using Docker.

Technologies Used
Node.js: The JavaScript runtime environment.

Express.js: A minimal and flexible Node.js web application framework.

MongoDB: A NoSQL database for flexible and persistent data storage.

Redis: An in-memory data store used for high-speed caching.

Mongoose: An elegant MongoDB object modeling tool for Node.js.

dotenv: A module to load environment variables from a .env file.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js

npm (Node Package Manager)

MongoDB (A running instance)

Redis (A running instance)

Getting Started
Clone the repository:

git clone [your-repo-url]
cd [your-repo-name]/backend

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the backend directory and add the following:

PORT=3000
MONGODB_URI="your_mongodb_connection_string"
REDIS_URL="your_redis_connection_string"

Replace the placeholder connection strings with your actual MongoDB and Redis URIs.

Run the server:

node index.js

The server will start on http://localhost:3000.

API Endpoints
Method

Endpoint

Description

POST

/api/shorten

Creates a new short URL.

GET

/:slug

Redirects to the original URL.

GET

/api/redirect/:slug

A dedicated API endpoint for the frontend to use.

Example Request (POST /api/shorten):

{
  "url": "https://www.example.com/this-is-a-very-long-url"
}

Example Response:

{
  "original": "https://www.example.com/this-is-a-very-long-url",
  "short": "http://localhost:3000/aBcDeF",
  "slug": "aBcDeF"
}

The /:slug endpoint is a public-facing route for users to click on. The /api/redirect/:slug endpoint is for your frontend to make an API call and handle the redirection itself.
