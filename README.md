# VideoDownloader - Nest.js Backend

This is the backend for the VideoDownloader, built with Nest.js. It provides API for the front-end application to interact with.

## Technologies Used

This project was built using:

- Nest.js
- TypeORM
- SQL

## Installation

To run this project, follow these steps:

1. Clone this repository
2. Install dependencies using `yarn`
3. Start the development server using `npm run start:dev`
4. The server will be running on http://localhost:3000

## API Endpoints

This project includes the following API endpoints:
## Video

### GET /video/recent

This endpoint returns a list of recent downloaded videos in the database.

### POST /video

This endpoint allows you to get download link to video, and save it to database

## Auth 

### POST /login

This endpoint allows you to login to existing account. If credentials are valid it returns cookie with JWT. 

### POST /register

This endpoint allows you to create new accoount with UUID, name, email and hashed password.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
