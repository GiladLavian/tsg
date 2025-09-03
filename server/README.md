# TSG Server - Dynamic Form API

A robust Node.js TypeScript API server for the TSG Dynamic Form System. Provides comprehensive form management, validation, analytics, and security features.

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## 🚀 Features

- �️ **RESTful API Design** - Complete CRUD operations with proper HTTP methods
- 📝 **Dynamic Form Management** - Schema-based form validation and storage
- � **Advanced Validation** - Joi schemas with comprehensive input validation
- � **Duplicate Prevention** - Intelligent duplicate detection algorithms
- 📊 **Analytics Engine** - Real-time data aggregation and insights
- 🛡️ **Enterprise Security** - Rate limiting, CORS, Helmet, input sanitization
- 🗄️ **Database Integration** - PostgreSQL with Prisma ORM for type safety
- 📈 **Performance Monitoring** - Request logging and error tracking
- 🔧 **TypeScript** - Full type safety throughout the application
- 📋 **API Documentation** - Comprehensive endpoint documentation

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **Language**: TypeScript 4.9
- **Database**: PostgreSQL 12+
- **ORM**: Prisma 5.x
- **Validation**: Joi 17.x
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon, ts-node, ESLint, Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and configuration
   ```

3. **Setup the database:**
   ```bash
   npm run prisma:generate  # Generate Prisma client
   npm run prisma:migrate   # Run database migrations
   npm run prisma:seed      # Seed with sample data (optional)
   ```

4. **Start development server:**
   ```bash
   npm run dev              # Starts server on http://localhost:5001
   ```

5. **Verify installation:**
   - API Health: [http://localhost:5001/health](http://localhost:5001/health)
   - API Documentation: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## 🔧 Configuration

### Environment Variables (.env)

```env
# Application
NODE_ENV=development
PORT=5001

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tsg_db"

# Security
ALLOWED_ORIGINS="http://localhost:3000"
JWT_SECRET="your-jwt-secret-key"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # Max requests per window

# Logging
LOG_LEVEL=info
```

## 📚 API Documentation

### Core Endpoints

#### Submit Form Data
```http
POST /api/submissions
Content-Type: application/json

{
  "data": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "preferences": ["newsletter", "updates"]
  }
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "clh7x4y9a0000s8dw1234567",
    "submittedAt": "2025-09-03T10:30:00Z"
  },
  "message": "Form submitted successfully"
}
```

#### Get All Submissions
```http
GET /api/submissions?page=1&limit=10

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "clh7x4y9a0000s8dw1234567",
      "data": {
        "fullName": "John Doe",
        "email": "john@example.com",
        "age": 28
      },
      "submittedAt": "2025-09-03T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "totalPages": 15
  }
}
```

#### Get Submission by ID
```http
GET /api/submissions/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "clh7x4y9a0000s8dw1234567",
    "data": { ... },
    "submittedAt": "2025-09-03T10:30:00Z"
  }
}
```

#### Get Form Schema
```http
GET /api/schemas/:name

Response: 200 OK
{
  "success": true,
  "data": {
    "name": "user-registration",
    "description": "User registration form",
    "fields": [
      {
        "name": "fullName",
        "type": "text",
        "label": "Full Name",
        "required": true,
        "validation": {
          "minLength": 2,
          "maxLength": 50
        }
      }
    ]
  }
}
```

#### Get Analytics Data
```http
GET /api/analytics

Response: 200 OK
{
  "success": true,
  "data": {
    "totalSubmissions": 150,
    "averageAge": 28.5,
    "genderDistribution": {
      "male": 60,
      "female": 75,
      "other": 15
    },
    "submissionTrends": [
      {
        "date": "2025-09-01",
        "count": 12
      }
    ],
    "topFields": [
      {
        "field": "email",
        "usage": 100
      }
    ]
  }
}
```

#### Health Check
```http
GET /health

Response: 200 OK
{
  "status": "ok",
  "timestamp": "2025-09-03T10:30:00Z",
  "uptime": 12345,
  "database": "connected",
  "version": "1.0.0"
}
```

### Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

#### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Duplicate submission detected
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## 📋 Supported Field Types

| Field Type | Description | Validation Options |
|------------|-------------|-------------------|
| `text` | Single-line text input | minLength, maxLength, pattern, required |
| `textarea` | Multi-line text input | minLength, maxLength, required |
| `email` | Email input with validation | Email format, required |
| `password` | Secure password input | minLength, pattern, required |
| `number` | Numeric input | min, max, step, required |
| `date` | Date picker | min, max date, required |
| `select` | Dropdown selection | options, required |
| `radio` | Radio button group | options, required |
| `checkbox` | Checkbox input | required |
| `url` | URL input with validation | URL format, required |
| `tel` | Telephone input | Pattern validation, required |

## 🔒 Security Features

- **Rate Limiting** - Configurable per-IP request limits
- **CORS Protection** - Cross-origin request policy enforcement
- **Input Validation** - Joi schema validation for all inputs
- **SQL Injection Prevention** - Prisma ORM parameterized queries
- **XSS Prevention** - Input sanitization and output encoding
- **Security Headers** - Helmet.js security middleware
- **Error Sanitization** - No sensitive data in error responses
- **Request Logging** - Comprehensive access and error logging

## 📊 Analytics Features

The analytics engine provides:

- **Real-time Metrics** - Live submission counts and statistics
- **Demographic Analysis** - Age, gender, and preference distributions
- **Submission Trends** - Time-series analysis with configurable periods
- **Field Usage Statistics** - Most/least used fields and completion rates
- **Performance Metrics** - API response times and error rates
- **Data Aggregation** - Efficient database queries with caching

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run dev:debug        # Start with debugging enabled

# Building
npm run build            # Compile TypeScript to JavaScript
npm run start            # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed database with sample data
npm run prisma:reset     # Reset database (caution!)

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run type-check       # TypeScript compilation check

# Testing
npm run test             # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Project Structure

```
server/
├── src/
│   ├── controllers/        # Request handlers
│   │   ├── form.controller.ts
│   │   └── analytics.controller.ts
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── cors.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/            # API route definitions
│   │   ├── form.routes.ts
│   │   ├── analytics.routes.ts
│   │   └── health.routes.ts
│   ├── services/          # Business logic layer
│   │   ├── form.service.ts
│   │   ├── analytics.service.ts
│   │   └── duplicate.service.ts
│   ├── utils/             # Utility functions
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── error-handler.ts
│   ├── types/             # TypeScript interfaces
│   └── app.ts             # Express app configuration
├── prisma/                # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/                 # Test files
├── .env.example          # Environment template
├── package.json
└── tsconfig.json
```

## 🚀 Production Deployment

### Environment Setup

1. **Production Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5001
   DATABASE_URL="postgresql://user:pass@prod-host:5432/tsg_prod"
   ALLOWED_ORIGINS="https://yourdomain.com"
   JWT_SECRET="secure-production-secret"
   ```

2. **Build and Start**
   ```bash
   npm run build
   npm start
   ```

3. **Database Migration**
   ```bash
   npm run prisma:migrate
   ```

### Monitoring & Logging

- Request logging with Winston
- Error tracking and alerting
- Performance monitoring
- Database connection health checks

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists

2. **Prisma Generate Issues**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

3. **TypeScript Compilation Errors**
   ```bash
   npm run type-check
   npm run lint:fix
   ```

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on port 5001

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Joi Validation](https://joi.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable allowed origins
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **Duplicate Prevention**: Automatic duplicate submission detection

## Database Schema

### FormSubmission
- `id`: Unique identifier
- `data`: JSON data containing form values
- `createdAt`: Submission timestamp
- `updatedAt`: Last update timestamp

### FormSchema
- `id`: Unique identifier
- `name`: Schema name (unique)
- `schema`: JSON schema definition
- `description`: Optional description
- `isActive`: Whether schema is active
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Scripts

- `npm run dev`: Start development server with nodemon
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio

## Environment Variables

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/tsg_db?schema=public"
ALLOWED_ORIGINS="http://localhost:3000"
```

## Project Structure

```
src/
├── config/          # Configuration files
├── middlewares/     # Express middlewares
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript types
├── utils/           # Utility functions
└── index.ts         # Main server file
```
