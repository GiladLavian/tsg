# TSG Client - Dynamic Form System

A modern React TypeScript application for dynamic form generation, submission, and analytics management.

## 🚀 Features

- **Dynamic Form Generation**: Create forms from JSON schemas with comprehensive field types
- **Real-time Validation**: Client-side validation with immediate feedback
- **Analytics Dashboard**: View submission analytics with interactive charts
- **Form Management**: Create, edit, and manage form submissions
- **Material-UI Design**: Modern, responsive interface using Material-UI v5
- **TypeScript**: Full type safety throughout the application
- **State Management**: Centralized state management with useReducer patterns

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2 with TypeScript
- **UI Library**: Material-UI v5 (@mui/material)
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Charts**: Recharts for analytics visualization
- **Validation**: Yup schemas with React Hook Form
- **Date Handling**: Day.js
- **Code Quality**: ESLint + Prettier with TypeScript support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── analytics/   # Analytics components
│   │   ├── submission/  # Form submission components
│   │   └── view/        # Data viewing components
│   └── form/           # Dynamic form components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Top-level page components
├── reducers/           # State management reducers
│   ├── form.reducer.ts
│   ├── dashboard.reducer.ts
│   └── index.ts
├── services/           # API and external services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and helpers
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running TSG server (see ../server/README.md)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
- Hot reloading enabled
- Lint errors displayed in console

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
- Optimized and minified for best performance
- Ready for deployment

### `npm run lint`
Runs ESLint to check code quality and TypeScript compliance.

### `npm run lint:fix`
Automatically fixes ESLint issues where possible.

## 🏗 Architecture

### State Management
- **Dashboard State**: Managed via `DashboardContext` with reducer pattern
- **Form State**: Handled by `useFormState` hook with form-specific reducer
- **Centralized Reducers**: All reducers extracted to `src/reducers/` for maintainability

### Component Organization
- **Feature-based**: Components organized by feature area (dashboard, form, etc.)
- **Separation of Concerns**: UI components separate from business logic
- **Reusable Components**: Shared components in `/components` directory

### API Integration
- **Service Layer**: Centralized API calls in `src/services/`
- **Type Safety**: Full TypeScript coverage for API responses
- **Error Handling**: Comprehensive error handling with user feedback

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach using Material-UI breakpoints
- **Dark/Light Theme**: Material-UI theming support
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and validation feedback
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_APP_NAME=TSG Dynamic Forms
```

### ESLint Configuration
The project includes comprehensive ESLint rules for:
- TypeScript best practices
- React hooks rules
- Code formatting with Prettier
- Import/export validation

## 🧪 Testing

The project includes:
- **Unit Tests**: Component testing with React Testing Library
- **Type Safety**: TypeScript compile-time checks
- **Lint Tests**: Code quality validation

Run tests:
```bash
npm test
```

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom`: React framework
- `typescript`: Type safety
- `@mui/material`: UI component library
- `axios`: HTTP client
- `recharts`: Data visualization

### Development Dependencies
- `@typescript-eslint/*`: TypeScript linting
- `@testing-library/*`: Testing utilities
- `eslint` & `prettier`: Code quality tools

## 🚀 Deployment

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting platform
3. Ensure environment variables are configured for production

## 🔄 Integration with TSG Server

This client connects to the TSG server API at `http://localhost:5001` by default. 

Key API endpoints:
- `GET /api/submissions` - Fetch form submissions
- `POST /api/submissions` - Submit form data
- `GET /api/schemas/:name` - Get form schema
- `GET /api/analytics` - Fetch analytics data

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
