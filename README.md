# Job Portal Backend (Freelancing Project)

A production-ready RESTful API backend for a comprehensive job portal platform. This system was developed as a paid freelancing project to serve a real client's business needs, providing role-based job posting, application management, and user profile features for employers and job seekers.

## Features

### Authentication & Authorization
- JWT-based authentication with token verification
- Role-based access control (Admin, Employer, Candidate/Job Seeker)
- Secure password hashing with bcrypt
- Protected routes with authentication middleware
- Token-based session management

### User Management
- Employer registration, login, and profile management
- Candidate registration, login, and profile management
- Avatar upload functionality for both user types
- Password change functionality
- User profile CRUD operations with validation

### Job Management
- Complete job posting CRUD operations (create, read, update, delete)
- Job listings with filtering capabilities
- Employer-specific job management (view my jobs, job count)
- Detailed job information including title, category, employment status, qualifications, responsibilities, location, and vacancy count
- Role-based job posting (employers only)

### Resume Management
- Comprehensive resume builder with structured data
- Education history tracking
- Work experience tracking
- Resume file upload (PDF/document upload)
- Resume CRUD operations
- Resume retrieval by candidate ID
- Multiple resume support per candidate

### Content Management
- Blog post creation and management
- Vlog (video blog) creation and management
- Soft delete functionality for content

### Data Validation & Error Handling
- Request parameter validation using lodash
- Boom error handling for consistent API responses
- Custom error middleware for 404 and 500 errors
- Field-level validation on all endpoints

### Additional Features
- Static file serving for uploaded content
- CORS enabled for cross-origin requests
- Request logging and monitoring
- Helmet security headers
- Database migration support via Sequelize CLI
- TypeScript for type safety

## Tech Stack

**Runtime & Framework:**
- Node.js
- Express.js 4.17
- TypeScript 3.7

**Database:**
- MySQL 2.18
- Sequelize ORM 5.21 (with TypeScript support)
- Sequelize CLI for migrations

**Authentication & Security:**
- jsonwebtoken (JWT authentication)
- bcrypt (password hashing)
- Helmet (security headers)
- CORS

**File Upload:**
- Multer (multipart/form-data handling)
- Express-fileupload

**Validation & Error Handling:**
- Lodash (data manipulation and validation)
- Boom (@hapi/boom, express-boom) - HTTP error responses
- Express-boom-v2

**Logging & Monitoring:**
- Winston (logging)
- Morgan (HTTP request logging)
- Mongoose-morgan

**Development Tools:**
- Nodemon (development server)
- ts-node (TypeScript execution)
- dotenv (environment configuration)

## API Overview

The API is versioned at `/v1` and provides the following resource groups:

### `/v1/employer`
- `POST /register` - Employer registration
- `POST /login` - Employer authentication
- `GET /` - List all employers
- `GET /:id` - Get employer by ID
- `PUT /:id` - Update employer profile (authenticated)
- `PUT /avatar` - Upload employer avatar (authenticated)
- `PUT /changePassword/:id` - Change password (authenticated)
- `DELETE /:id` - Delete employer account (authenticated)

### `/v1/candidate`
- `POST /register` - Candidate registration
- `POST /login` - Candidate authentication
- `GET /` - List all candidates
- `GET /:id` - Get candidate by ID
- `PUT /:id` - Update candidate profile (authenticated)
- `PUT /avatar` - Upload candidate avatar (authenticated)
- `PUT /changePassword/:id` - Change password (authenticated)
- `DELETE /` - Delete candidate account (authenticated)

### `/v1/jobs`
- `POST /` - Create job posting (authenticated, employer only)
- `GET /` - List all jobs
- `GET /:id` - Get job details by ID
- `GET /myjobs` - Get employer's jobs (authenticated, employer only)
- `GET /myjobscount` - Count employer's jobs (authenticated, employer only)
- `PUT /:id` - Update job posting (authenticated, employer only)
- `DELETE /:id` - Delete job posting (authenticated, employer only)

### `/v1/resume`
- `POST /` - Create resume (authenticated, candidate only)
- `GET /` - List all resumes
- `GET /:id` - Get resume by ID
- `GET /candidate/:id` - Get resumes by candidate ID
- `PUT /:id` - Update resume (authenticated, candidate only)
- `PUT /uploadResume/` - Upload resume file (authenticated, candidate only)
- `DELETE /:id` - Delete resume (authenticated, candidate only)

### `/v1/admin`
- `POST /login` - Admin authentication
- `GET /test` - Test authenticated admin access

### `/v1/blog`
- Blog post management endpoints

### `/v1/vlog`
- Video blog management endpoints

## Architecture

The project follows a layered MVC architecture with separation of concerns:

```
src/
├── api/              # Route definitions and endpoint mappings
│   ├── employerRoute.ts
│   ├── candidateRoute.ts
│   ├── jobsRoute.ts
│   ├── resumeRoute.ts
│   ├── adminRoute.ts
│   ├── blogRoute.ts
│   └── vlogRoute.ts
├── controller/       # Request/response handling and data formatting
│   ├── employerController.ts
│   ├── candidateController.ts
│   ├── jobsController.ts
│   └── resumeController.ts
├── service/          # Business logic and data processing
│   ├── employerService.ts
│   ├── candidateService.ts
│   ├── jobsService.ts
│   ├── resumeService.ts
│   ├── educationService.ts
│   └── experienceService.ts
├── models/           # Sequelize ORM models (database schema)
│   ├── EmployerModel.ts
│   ├── CandidateModel.ts
│   ├── JobModel.ts
│   ├── ResumeModel.ts
│   ├── EducationModel.ts
│   ├── ExperienceModel.ts
│   ├── ApplicationModel.ts
│   ├── BlogModel.ts
│   └── VlogModel.ts
├── helpers/          # Utility functions and middleware
│   ├── verifyToken.ts    # JWT authentication middleware
│   └── errorHandler.ts   # Error handling middleware
├── config/           # Configuration files
│   ├── config.ts         # Application configuration
│   └── db.ts             # Database connection
├── interface/        # TypeScript interfaces
├── App.ts            # Express application setup
└── index.ts          # Application entry point

migrations/           # Sequelize database migrations
config/               # Sequelize configuration
uploads/              # Static file storage for uploads
```

**Design Patterns:**
- **Service Layer Pattern**: Business logic separated from controllers
- **Middleware Chain Pattern**: Multiple middleware functions for validation, authentication, and data processing
- **Repository Pattern**: Sequelize models abstract database operations
- **Dependency Injection**: Loose coupling between layers

## Setup & Run

### Prerequisites
- Node.js (v12 or higher recommended)
- MySQL database server
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd job-portal-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Application
APP=development
PORT=8000

# Database
DB_URL=mysql://username:password@host:port/database

# JWT Configuration
JWT_ENCRYPTION=your_jwt_secret_key
JWT_EXPIRATION=1h

# Security
SALT_ROUNDS=10
SHA_KEY=your_sha_secret_key
```

4. Run database migrations:
```bash
npm run migrate
```

### Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run prod
```
This builds TypeScript files and starts the server.

**Start compiled application:**
```bash
npm start
```

### Additional Commands

**Build TypeScript:**
```bash
npm run build
```

**Undo last migration:**
```bash
npm run migrate-undo
```

**Undo all migrations:**
```bash
npm run migrate-undo-all
```

**Clean build artifacts:**
```bash
npm run clean
```

## Deployment / Production Notes

### Environment Configuration
- Ensure all environment variables are properly set in production (JWT secrets, database credentials, etc.)
- Never commit `.env` files or sensitive credentials to version control
- Use strong, randomly generated secrets for `JWT_ENCRYPTION` and `SHA_KEY`
- Set `APP` environment variable to `production` in production deployments

### Database Configuration
- The application uses MySQL with Sequelize ORM
- Run all migrations before starting the application: `npm run migrate`
- Configure database connection string via `DB_URL` environment variable
- Ensure database user has appropriate permissions for the schema
- Regular database backups are recommended for production data

### Static Files & Uploads
- Uploaded files (avatars, resumes) are stored in the `uploads/` directory
- Served statically at `/static` endpoint
- Consider using cloud storage (AWS S3, Google Cloud Storage) for production file uploads
- Implement file size limits and validation for uploads

### Security Considerations
- The application uses Helmet for security headers
- CORS is enabled - configure allowed origins for production
- JWT tokens expire based on `JWT_EXPIRATION` setting (default: 1 hour)
- All passwords are hashed using bcrypt before storage
- Admin credentials are currently hardcoded - implement proper admin user management for production

### Deployment Platforms
- The `Procfile` is included for Heroku deployment
- Application listens on port defined by `PORT` environment variable
- Compiled JavaScript is in the `dist/` directory after build
- Ensure Node.js version compatibility on deployment platform

## Freelancing Context

This backend API was delivered as part of a paid freelancing project for a client operating in the recruitment and job portal space. Key aspects of the project delivery:

### Project Scope & Deliverables
- Designed and implemented a complete RESTful API backend from scratch
- Developed role-based access control system supporting Admin, Employer, and Job Seeker roles
- Built comprehensive job posting and application management system
- Delivered production-ready code with proper error handling, validation, and security measures
- Provided database schema design and migration scripts for client's MySQL infrastructure

### Technical Responsibilities
- **Backend Architecture**: Structured the application using MVC pattern with services layer for maintainability
- **Database Design**: Created normalized database schema with proper relationships (Jobs-Employers, Resumes-Candidates, Education/Experience-Resumes)
- **Authentication & Security**: Implemented JWT-based authentication, role-based authorization, password hashing, and security best practices
- **API Development**: Built RESTful endpoints following industry standards with proper HTTP methods and status codes
- **File Management**: Integrated file upload functionality for avatars and resume documents
- **Data Validation**: Implemented comprehensive input validation and error handling across all endpoints

### Professional Standards
- Used TypeScript for type safety and better code maintainability
- Followed separation of concerns principle with distinct layers (routes, controllers, services, models)
- Implemented middleware chains for clean, reusable code
- Provided migration scripts for database version control
- Structured code for easy onboarding of future developers or client's internal team

### Client Value Delivered
- Enabled the client to launch their job portal platform with a robust, scalable backend
- Reduced development risk through proper error handling and validation
- Provided flexibility for future feature additions through clean architecture
- Delivered production-ready code that could be deployed immediately

---

**Note**: This is a professional backend implementation showcasing real-world development practices, security considerations, and scalable architecture patterns used in production systems.
