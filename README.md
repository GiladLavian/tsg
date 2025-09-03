# TSG - Dynamic Form System

A comprehensive full-stack TypeScript application for creating, managing, and analyzing dynamic forms. Built with modern technologies and professional architecture patterns.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## 🚀 Features

### Frontend (React 18 + TypeScript + Material-UI v5)
- 📝 **Dynamic Form Generation** - JSON schema-based form rendering with comprehensive field types
- 🎯 **Real-time Validation** - Immediate field validation with custom rules and error handling
- 📊 **Interactive Analytics** - Rich dashboard with charts and data visualization using Recharts
- 📋 **Submission Management** - Complete CRUD operations for form data
- 🎨 **Modern Design System** - Professional UI with Material-UI v5 components
- ⚡ **Optimized Performance** - useCallback optimization and professional state management
- 🏗️ **Feature-Based Architecture** - Organized component structure with reducers pattern
- 🔧 **TypeScript Coverage** - Full type safety across the entire application

### Backend (Node.js + Express + Prisma + PostgreSQL)
- 🛠️ **RESTful API** - Comprehensive API with proper HTTP methods and status codes
- 🗄️ **PostgreSQL Database** - Robust data persistence with Prisma ORM
- 🔍 **Advanced Validation** - Joi schemas with comprehensive input validation
- 📊 **Analytics Engine** - Sophisticated data aggregation and insights generation
- 🛡️ **Enterprise Security** - Rate limiting, CORS, Helmet, input sanitization
- 📋 **Schema Management** - Dynamic form schema validation and storage
- 🚫 **Duplicate Prevention** - Intelligent duplicate detection algorithms
- 📈 **Performance Monitoring** - Request logging and error tracking

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     TSG - Dynamic Form System                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────┐ │
│  │   React Client  │────▶│  Express API    │────▶│ PostgreSQL  │ │
│  │                 │     │                 │     │             │ │
│  │ • Material-UI   │     │ • TypeScript    │     │ • Prisma    │ │
│  │ • TypeScript    │     │ • Joi Validation│     │ • ACID      │ │
│  │ • State Mgmt    │◀────│ • Rate Limiting │     │ • Relations │ │
│  │ • Recharts      │     │ • CORS/Security │     │             │ │
│  └─────────────────┘     └─────────────────┘     └─────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        Component Structure                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Client (Port 3000)              Server (Port 5001)            │
│  ├── components/                 ├── controllers/               │
│  │   ├── dashboard/              │   ├── form.controller.ts     │
│  │   │   ├── analytics/          │   └── analytics.controller.ts│
│  │   │   ├── submission/         ├── middleware/                │
│  │   │   └── view/               │   ├── validation.middleware.ts│
│  │   └── form/                   │   └── security.middleware.ts │
│  ├── reducers/                   ├── services/                  │
│  │   ├── form.reducer.ts         │   ├── form.service.ts        │
│  │   └── dashboard.reducer.ts    │   └── analytics.service.ts   │
│  ├── context/                    ├── utils/                     │
│  └── services/                   └── prisma/                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
## 🛠️ Tech Stack

### Frontend Stack
- **React 18.2** - Modern UI library with hooks and concurrent features
- **TypeScript 4.9** - Static type checking and enhanced developer experience
- **Material-UI v5** - Google's Material Design component library
- **Recharts 2.8** - Composable charting library for React
- **Axios 1.5** - Promise-based HTTP client
- **React Hook Form 7.46** - Performant forms with easy validation
- **Day.js 1.11** - Lightweight date manipulation library
- **Yup 1.3** - Schema validation library

### Backend Stack
- **Node.js 18+** - JavaScript runtime environment
- **Express.js 4.18** - Fast, unopinionated web framework
- **TypeScript 4.9** - Type-safe backend development
- **Prisma 5.x** - Next-generation ORM with type safety
- **PostgreSQL 12+** - Advanced open-source relational database
- **Joi 17.x** - Powerful schema description and validation
- **Helmet** - Security middleware for Express apps
- **CORS** - Cross-Origin Resource Sharing middleware

### Development Tools
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **ts-node** - TypeScript execution for Node.js

## 📋 Prerequisites

- **Node.js 18+** - JavaScript runtime
- **PostgreSQL 12+** - Database server
- **npm or yarn** - Package manager
- **Git** - Version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/GiladLavian/tsg.git
cd tsg
```

### 2. Setup Backend (Terminal 1)
```bash
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed  # Optional: Load sample data

# Start development server
npm run dev
```

### 3. Setup Frontend (Terminal 2)
```bash
cd client

# Install dependencies  
npm install

# Start development server
npm start
```

### 4. Access the Application
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5001](http://localhost:5001)
- **API Health**: [http://localhost:5001/health](http://localhost:5001/health)
- **API Docs**: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## 📊 Supported Field Types

The dynamic form system supports comprehensive field types with robust validation:

| Field Type | Description | Validation Options | Features |
|------------|-------------|-------------------|----------|
| `text` | Single-line text input | minLength, maxLength, pattern, required | Placeholder, help text |
| `textarea` | Multi-line text input | minLength, maxLength, required | Rows configuration |
| `email` | Email input with validation | Email format, required | Built-in email validation |
| `password` | Secure password input | minLength, pattern, required | Masked input, strength indicator |
| `number` | Numeric input | min, max, step, required | Number formatting |
| `date` | Date picker | min, max date, required | Calendar widget |
| `select` | Dropdown selection | options, required | Single/multiple selection |
| `radio` | Radio button group | options, required | Mutually exclusive options |
| `checkbox` | Checkbox input | required | Boolean values |
| `url` | URL input with validation | URL format, required | Link validation |
| `tel` | Telephone input | Pattern validation, required | Phone number formatting |

### Example Form Schema
```json
{
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
      "validation": {
        "min": 18,
        "max": 120
      }
    }
  ]
}
```
## 🔧 Configuration

### Environment Variables

#### Server (.env)
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
```

#### Client (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5001
REACT_APP_APP_NAME=TSG Dynamic Forms

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_SUBMISSIONS_VIEW=true
```

## 📝 API Documentation

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
    "id": "123",
    "submittedAt": "2025-09-03T10:30:00Z"
  },
  "message": "Form submitted successfully"
}
```

#### Get All Submissions
```http
GET /api/submissions

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "123",
      "data": { ... },
      "submittedAt": "2025-09-03T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10
  }
}
```

#### Get Form Schema
```http
GET /api/schemas/user-registration

Response: 200 OK
{
  "success": true,
  "data": {
    "name": "user-registration",
    "description": "User registration form",
    "fields": [ ... ]
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
    "submissionTrends": [ ... ]
  }
}
```

### Error Responses
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

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP address
- **CORS Protection** - Configurable allowed origins with strict policies
- **Input Validation** - Comprehensive validation using Joi schemas
- **SQL Injection Prevention** - Prisma ORM provides built-in protection
- **XSS Prevention** - Input sanitization and output encoding
- **Helmet.js** - Sets security-related HTTP headers
- **Request Logging** - Comprehensive logging for security monitoring
- **Error Handling** - Secure error responses without information leakage

## 📈 Analytics & Insights

### Dashboard Features
- **Real-time Metrics** - Live submission counts and statistics
- **Interactive Charts** - Recharts-powered data visualization
- **Demographic Analysis** - Age, gender, and preference distributions
- **Submission Trends** - Time-series analysis of form submissions
- **Field Analytics** - Most/least used fields and completion rates
- **Performance Metrics** - Response times and error rates

### Supported Chart Types
- **Bar Charts** - Submission trends over time
- **Pie Charts** - Gender and preference distributions  
- **Line Charts** - Performance metrics and trends
- **Area Charts** - Cumulative data visualization

## 🧪 Development & Testing

### Available Scripts

#### Server Commands
```bash
npm run dev              # Start development server with nodemon
npm run build            # Compile TypeScript to JavaScript
npm run start            # Start production server
npm run lint             # Run ESLint for code quality
npm run lint:fix         # Auto-fix ESLint issues
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (database GUI)
npm run prisma:seed      # Seed database with sample data
```

#### Client Commands  
```bash
npm start                # Start development server (port 3000)
npm run build            # Build optimized production bundle
npm test                 # Run test suite with React Testing Library
npm run lint             # Run ESLint and TypeScript checks
npm run lint:fix         # Auto-fix linting issues
npm run eject            # Eject from Create React App (one-way)
```

### Code Quality
- **ESLint** - TypeScript and React best practices
- **Prettier** - Consistent code formatting
- **TypeScript** - Static type checking
- **Husky** - Git hooks for quality gates
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing

## 📁 Project Structure

```
tsg/
├── client/                     # React frontend application
│   ├── public/                 # Static assets and HTML template
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── dashboard/      # Dashboard feature components
│   │   │   │   ├── analytics/  # Analytics widgets
│   │   │   │   ├── submission/ # Form submission components
│   │   │   │   └── view/       # Data viewing components
│   │   │   └── form/           # Dynamic form components
│   │   ├── context/            # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Top-level page components
│   │   ├── reducers/           # State management reducers
│   │   │   ├── form.reducer.ts
│   │   │   ├── dashboard.reducer.ts
│   │   │   └── index.ts
│   │   ├── services/           # API service layer
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── server/                     # Node.js backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic layer
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript interfaces
│   ├── prisma/                # Database schema and migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── tsconfig.json
├── README.md                   # This file
└── tsg.code-workspace         # VS Code workspace configuration
## 🚀 Deployment

### Production Build

#### Client
```bash
cd client
npm run build
# Deploy build/ folder to your hosting platform
```

#### Server
```bash
cd server
npm run build
npm start
# Ensure environment variables are configured for production
```

### Docker Support (Coming Soon)
- Multi-stage Docker builds
- Docker Compose for development
- Production-ready containers

## 🔮 Roadmap

- [ ] **Authentication & Authorization** - User management and role-based access
- [ ] **Form Builder UI** - Visual drag-and-drop form designer
- [ ] **Advanced Analytics** - Machine learning insights and predictions
- [ ] **Real-time Collaboration** - Multi-user form editing
- [ ] **Export Features** - PDF/CSV export of submissions and analytics
- [ ] **Webhook Integration** - Real-time notifications and integrations
- [ ] **Mobile App** - React Native companion app
- [ ] **API Rate Limiting** - Advanced rate limiting and quotas

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use conventional commit messages
- Update documentation for new features

## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/GiladLavian/tsg/wiki)
- **Issues**: [GitHub Issues](https://github.com/GiladLavian/tsg/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GiladLavian/tsg/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the React foundation
- [Material-UI](https://mui.com/) for the design system
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Recharts](https://recharts.org/) for beautiful data visualization

---

**Built with ❤️ by Gilad Lavian**

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
