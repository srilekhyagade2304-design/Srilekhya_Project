# Job Portal Backend API

A backend REST API for a Job Portal application built using Node.js, Express.js, and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Postman

## Features

### Authentication
- Register as Job Seeker
- Register as Employer
- Login
- Get current user
- Logout

### Jobs
- Create a job
- View all jobs
- View a job by ID
- Update a job
- Delete a job

### Applications
- Apply for a job
- View my applications
- Employer can view applications for a job
- Employer can update application status

## Project Structure

```text
project/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
└── postman/
    └── Job-Portal-API.postman_collection.json