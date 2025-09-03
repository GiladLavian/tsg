# Service Migration Guide

The API service has been refactored into domain-specific services for better separation of concerns and maintainability.

## Migration Summary

### Old Service (Deprecated)
```typescript
import { apiService } from '../services/api.service';
```

### New Services
```typescript
import { submissionService, analyticsService, healthService } from '../services';
```

## Service Breakdown

### 1. SubmissionService (`submission.service.ts`)
Handles all form submission and schema management operations:

**Methods:**
- `submitForm(data)` - Submit form data
- `getSubmissions()` - Get all form submissions
- `getSubmissionById(id)` - Get specific submission
- `saveFormSchema(schema)` - Create/update form schema
- `getFormSchema(name)` - Get form schema by name
- `getFormSchemas()` - Get all form schemas
- `validateFormData(schemaName, data)` - Validate form data

**Usage:**
```typescript
import { submissionService } from '../services';

// Submit form
const response = await submissionService.submitForm(formData);

// Get submissions
const submissions = await submissionService.getSubmissions();
```

### 2. AnalyticsService (`analytics.service.ts`)
Handles all analytics and reporting operations:

**Methods:**
- `getAnalytics()` - Get main analytics data
- `getSubmissionAnalytics(schemaName?)` - Get submission analytics
- `getFieldAnalytics(schemaName)` - Get field-specific analytics
- `getUserBehaviorAnalytics()` - Get user behavior data
- `getPerformanceMetrics()` - Get performance metrics

**Usage:**
```typescript
import { analyticsService } from '../services';

// Get analytics
const analytics = await analyticsService.getAnalytics();

// Get submission analytics
const submissionAnalytics = await analyticsService.getSubmissionAnalytics();
```

### 3. HealthService (`health.service.ts`)
Handles system health and monitoring operations:

**Methods:**
- `healthCheck()` - Basic health check
- `getSystemStatus()` - Detailed system status
- `getDatabaseStatus()` - Database connection status
- `getDependenciesStatus()` - External service dependencies
- `ping()` - Basic connectivity check

**Usage:**
```typescript
import { healthService } from '../services';

// Health check
const health = await healthService.healthCheck();

// System status
const status = await healthService.getSystemStatus();
```

### 4. BaseHttpService (`http.service.ts`)
Provides common HTTP functionality for all services:

- Axios configuration and interceptors
- Request/response logging
- Authentication token handling
- Error handling
- Generic HTTP methods (GET, POST, PUT, DELETE)

## Migration Steps

### 1. Update Imports
```typescript
// Before
import { apiService } from '../services/api.service';

// After
import { submissionService, analyticsService } from '../services';
```

### 2. Update Method Calls
```typescript
// Before
await apiService.getSubmissions();
await apiService.getAnalytics();

// After
await submissionService.getSubmissions();
await analyticsService.getAnalytics();
```

### 3. Type Updates
All services use the existing type definitions from the `types/` folder for consistency.

## Benefits

1. **Separation of Concerns**: Each service handles a specific domain
2. **Better Maintainability**: Easier to locate and modify functionality
3. **Improved Testing**: Services can be mocked independently
4. **Type Safety**: Proper TypeScript interfaces for each domain
5. **Scalability**: Easy to add new domain-specific services

## Backward Compatibility

The old `apiService` is still available for backward compatibility but is marked as deprecated:

```typescript
// Still works but deprecated
import { apiService } from '../services';
```

## Files Updated

- `client/src/services/http.service.ts` - Base HTTP service
- `client/src/services/submission.service.ts` - Form operations
- `client/src/services/analytics.service.ts` - Analytics operations
- `client/src/services/health.service.ts` - Health monitoring
- `client/src/services/index.ts` - Service exports
- `client/src/context/dashboard.context.tsx` - Updated to use new services
