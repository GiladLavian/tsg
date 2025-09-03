# Dynamic Form Generation System

A full-stack TypeScript application that allows users to create and submit dynamic forms based on JSON schemas, with real-time analytics and data persistence.

![Project Demo](https://via.placeholder.com/800x400/1976d2/ffffff?text=Dynamic+Form+System)

## 🚀 Features

### Frontend (React + Material-UI)
- 📝 **Dynamic Form Rendering** - Generate forms based on JSON schemas
- 🎯 **Real-time Validation** - Field-level validation with custom rules
- 📊 **Analytics Dashboard** - Visual charts and statistics
- 📋 **Submission Management** - View and manage form submissions
- 🎨 **Modern UI** - Clean, responsive design with Material-UI
- ⚡ **Real-time Updates** - Instant feedback and state management

### Backend (Node.js + Express + Prisma)
- 🛠️ **RESTful API** - Comprehensive API for form management
- 🗄️ **PostgreSQL Database** - Reliable data persistence with Prisma ORM
- 🔍 **Duplicate Detection** - Automatic duplicate submission prevention
- 📊 **Analytics Engine** - Generate insights from form data
- 🛡️ **Security Features** - Rate limiting, CORS, input validation
- 📋 **Schema Validation** - Joi-based validation for all inputs

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│  Express API    │────▶│   PostgreSQL    │
│                 │     │                 │     │                 │
│ • Material-UI   │     │ • REST Routes   │     │ • Form Data     │
│ • State Mgmt    │     │ • Validation    │     │ • Schemas       │
│ • Charts        │     │ • Analytics     │     │ • Analytics     │
│ • Forms         │     │ • Security      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI v5** - Component library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Day.js** - Date handling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Joi** - Input validation
- **Helmet** - Security middleware

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tsg
```

### 2. Setup Backend
```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install

# Start development server
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## 📊 Supported Field Types

The system supports various form field types with validation:

| Type | Description | Validation Options |
|------|-------------|-------------------|
| `text` | Text input | minLength, maxLength, pattern |
| `email` | Email input | Email format validation |
| `password` | Password input | minLength, pattern |
| `number` | Numeric input | min, max values |
| `date` | Date picker | Date format validation |
| `dropdown` | Select dropdown | Predefined options |

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/tsg_db"
ALLOWED_ORIGINS="http://localhost:3000"
```

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Dynamic Form System
```

## 📝 API Documentation

### Form Management

#### Submit Form
```http
POST /api/forms/submit
Content-Type: application/json

{
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

#### Get Submissions
```http
GET /api/forms/submissions
```

#### Get Analytics
```http
GET /api/analytics
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 📊 Sample Form Schema

```json
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
    },
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
      "required": true
    },
    {
      "name": "age",
      "type": "number",
      "label": "Age",
      "required": true,
      "min": 13,
      "max": 120
    },
    {
      "name": "gender",
      "type": "dropdown",
      "label": "Gender",
      "required": true,
      "options": ["Male", "Female", "Other"]
    }
  ]
}
```

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable allowed origins
- **Input Validation** - Comprehensive validation with Joi
- **SQL Injection Prevention** - Prisma ORM protection
- **XSS Prevention** - Input sanitization

## 📈 Analytics Features

- **Total Submissions** - Count of all form submissions
- **Gender Distribution** - Pie chart of gender demographics
- **Submission Trends** - Bar chart of submissions over time
- **Average Age** - Statistical analysis of age data
- **Field Usage** - Most commonly used form fields

## 🧪 Development

### Available Scripts

#### Server
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

#### Client
```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## 📁 Project Structure

```
tsg/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── common/     # Reusable components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   └── form/       # Form components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── public/            # Static assets
└── server/                # Node.js backend
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── middlewares/   # Express middlewares
    │   ├── routes/        # API routes
    │   ├── services/      # Business logic
    │   ├── types/         # TypeScript types
    │   └── utils/         # Utility functions
    └── prisma/           # Database schema
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [Prisma](https://prisma.io/) for the amazing ORM
- [Recharts](https://recharts.org/) for beautiful charts
- [Express.js](https://expressjs.com/) for the robust web framework

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-api-documentation)
2. Open an [issue](https://github.com/your-repo/issues)
3. Contact the development team

---

Made with ❤️ by the TSG Team
