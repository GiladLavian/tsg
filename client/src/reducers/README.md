# Reducers

This folder contains all Redux-style reducers extracted from the application components and hooks.

## Structure

### `form.reducer.ts`
- **Purpose**: Manages dynamic form state including field values, validation errors, and submission status
- **State**: Field data, validation errors, loading states
- **Actions**: SET_FIELD_VALUE, SET_FIELD_ERROR, CLEAR_FIELD_ERROR, SET_SUBMITTING, RESET_FORM, SET_FORM_DATA, SET_VALIDATION_ERRORS
- **Used by**: `useFormState` hook for dynamic form management

### `dashboard.reducer.ts`
- **Purpose**: Manages dashboard application state including submissions, analytics, schemas, and loading states
- **State**: Form submissions list, current schema, analytics data, loading states, error states, last updated timestamps
- **Actions**: SET_LOADING, SET_ERROR, SET_SUBMISSIONS, ADD_SUBMISSION, SET_SCHEMA, SET_ANALYTICS, CLEAR_ERRORS, RESET_DASHBOARD
- **Used by**: `DashboardContext` for global dashboard state management

### `index.ts`
- **Purpose**: Central export point for all reducers and their related types
- **Exports**: All reducers, initial states, and TypeScript types

## Usage

```typescript
// Import individual reducers
import { formReducer, initialFormState } from '../reducers/form.reducer';
import { dashboardReducer, initialDashboardState } from '../reducers/dashboard.reducer';

// Or import from index (recommended)
import { formReducer, dashboardReducer, initialFormState, initialDashboardState } from '../reducers';
```

## Benefits of Extraction

1. **Separation of Concerns**: Logic is separated from UI components
2. **Reusability**: Reducers can be tested independently and reused
3. **Maintainability**: Centralized state management logic
4. **Type Safety**: Comprehensive TypeScript support with exported types
5. **Testability**: Easy to unit test reducer logic in isolation
