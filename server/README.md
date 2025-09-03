# Dynamic Form Generation API Server

A Node.js API server for the Dynamic Form Generation system that handles form submissions, validation, and analytics.

## Features

- 🚀 Dynamic form schema management
- 📝 Form submission with validation
- 🔍 Duplicate submission prevention
- 📊 Analytics and reporting
- 🛡️ Security middleware (helmet, rate limiting)
- 🗄️ PostgreSQL database with Prisma ORM
- 📋 Comprehensive API documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Form Management

#### Submit Form Data
```
POST /api/forms/submit
Content-Type: application/json

{
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "Male"
  }
}
```

#### Get All Submissions
```
GET /api/forms/submissions
```

#### Get Submission by ID
```
GET /api/forms/submissions/:id
```

#### Create/Update Form Schema
```
POST /api/forms/schema
Content-Type: application/json

{
  "name": "user-registration",
  "description": "User registration form",
  "fields": [
    {
      "name": "firstName",
      "type": "text",
      "label": "First Name",
      "required": true,
      "minLength": 2,
      "maxLength": 50
    }
    // ... more fields
  ]
}
```

#### Get Form Schema
```
GET /api/forms/schema/:name
```

#### Get All Form Schemas
```
GET /api/forms/schemas
```

#### Validate Form Data
```
POST /api/forms/validate
Content-Type: application/json

{
  "schemaName": "user-registration",
  "data": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Analytics

#### Get Analytics Data
```
GET /api/analytics
```

Returns:
- Total submissions count
- Submissions by gender
- Average age
- Submissions by date
- Top form fields

### Health Check

```
GET /health
```

## Form Field Types

The system supports the following field types:

- **text**: Regular text input
- **email**: Email validation
- **password**: Password input (hidden)
- **number**: Numeric input with min/max validation
- **date**: Date picker
- **dropdown**: Select from predefined options

## Field Validation Options

Each field can have the following validation rules:

- `required`: Whether the field is mandatory
- `minLength`/`maxLength`: String length validation
- `min`/`max`: Numeric range validation
- `options`: Available choices for dropdown fields
- `validation.pattern`: Custom regex pattern
- `validation.message`: Custom validation message

## Error Handling

The API uses consistent error response format:

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
