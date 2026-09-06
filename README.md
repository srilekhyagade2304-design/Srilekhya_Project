# 💼 Job Portal Backend API

## 📌 Project Overview

The Job Portal Backend API is a RESTful web service developed for managing an online job portal system. The application provides a secure and structured backend for job seekers and employers to interact with each other through job postings and applications.

The backend is developed using Node.js and Express.js and uses MongoDB Atlas as the database. Authentication and authorization are implemented using JSON Web Tokens (JWT), while passwords are securely handled using bcryptjs.

The system supports two primary types of users:

1. **Job Seekers**
   - Register and login to the system
   - View available job opportunities
   - Apply for jobs
   - View their submitted applications

2. **Employers**
   - Register and login to the system
   - Create job postings
   - View available jobs
   - Update their job postings
   - Delete their job postings
   - View applications submitted for their jobs
   - Update application status

The complete API has been tested using Postman, and a Postman collection is included in this repository for easy testing.

---

# 🎯 Project Objectives

The main objective of this project is to develop a backend system that provides the essential functionality required for a job portal application.

The major objectives are:

- To develop a RESTful backend API using Node.js and Express.js.
- To implement user registration and login functionality.
- To provide role-based access for employers and job seekers.
- To securely store user passwords using password hashing.
- To implement JWT-based authentication.
- To connect the application with MongoDB Atlas.
- To allow employers to manage job postings.
- To allow job seekers to apply for available jobs.
- To allow users to view their relevant application information.
- To allow employers to manage applications received for their jobs.
- To test all API endpoints using Postman.
- To organize the project using a modular backend architecture.

---

# 🚀 Features

## 👤 User Authentication

The system provides authentication functionality for users.

Users can:

- Register a new account.
- Login using their email and password.
- Retrieve information about the currently logged-in user.
- Logout from the application.

Authentication is implemented using JWT.

---

## 👨‍💼 Employer Features

Employers have access to job-management functionality.

An employer can:

- Create a new job.
- View all jobs.
- View an individual job.
- Update a job.
- Delete a job.
- View applications received for their job.
- Update the status of an application.

Only authenticated employers are allowed to perform employer-specific operations.

---

## 👨‍🎓 Job Seeker Features

Job seekers can interact with available job postings.

A job seeker can:

- View available jobs.
- View details of a specific job.
- Apply for a job.
- Submit a cover letter with an application.
- View their submitted applications.

Only authenticated job seekers can apply for jobs.

---

# 🛠️ Technologies Used

The following technologies and tools are used in this project.

| Technology | Purpose |
|---|---|
| Node.js | Backend JavaScript runtime |
| Express.js | Web framework for creating REST APIs |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| JSON Web Token | Authentication |
| Cookie Parser | Handling authentication cookies |
| dotenv | Environment variable management |
| CORS | Cross-Origin Resource Sharing |
| Nodemon | Development server auto-restart |
| Postman | API testing |
| Git | Version control |
| GitHub | Source code hosting |

---

# 🏗️ System Architecture

The project follows a modular backend architecture.

The major components are:

```text
Client
   |
   | HTTP Request
   ↓
Express Server
   |
   ↓
Routes
   |
   ↓
Middleware
   |
   ↓
Controllers
   |
   ↓
Models
   |
   ↓
MongoDB Atlas
