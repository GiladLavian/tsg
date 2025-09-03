import { BaseHttpService, ApiResponse } from './http.service';

/**
 * Analytics service
 * Handles all analytics and reporting related operations
 */
export class AnalyticsService extends BaseHttpService {
  /**
   * Get analytics data
   */
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    return this.get<AnalyticsData>('/analytics');
  }

  /**
   * Get form submission analytics
   */
  async getSubmissionAnalytics(schemaName?: string): Promise<ApiResponse<SubmissionAnalytics>> {
    const url = schemaName ? `/analytics/submissions?schema=${schemaName}` : '/analytics/submissions';
    return this.get<SubmissionAnalytics>(url);
  }

  /**
   * Get form field analytics
   */
  async getFieldAnalytics(schemaName: string): Promise<ApiResponse<FieldAnalytics[]>> {
    return this.get<FieldAnalytics[]>(`/analytics/fields?schema=${schemaName}`);
  }

  /**
   * Get user behavior analytics
   */
  async getUserBehaviorAnalytics(): Promise<ApiResponse<UserBehaviorAnalytics>> {
    return this.get<UserBehaviorAnalytics>('/analytics/behavior');
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(): Promise<ApiResponse<PerformanceMetrics>> {
    return this.get<PerformanceMetrics>('/analytics/performance');
  }
}

/**
 * Main analytics data interface - matches existing types
 */
export interface AnalyticsData {
  totalSubmissions: number;
  submissionsByGender?: Record<string, number>;
  averageAge?: number;
  submissionsByDate?: Record<string, number>;
  topFormFields?: Record<string, number>;
}

/**
 * Submission analytics interface
 */
export interface SubmissionAnalytics {
  totalSubmissions: number;
  submissionsToday: number;
  submissionsThisWeek: number;
  submissionsThisMonth: number;
  completionRate: number;
  averageCompletionTime: number;
  abandonmentRate: number;
  peakHours: PeakHour[];
  dailyTrends: DailyTrend[];
}

/**
 * Field analytics interface
 */
export interface FieldAnalytics {
  fieldName: string;
  fieldType: string;
  completionRate: number;
  averageTime: number;
  errorRate: number;
  mostCommonValues: CommonValue[];
  validationErrors: ValidationError[];
}

/**
 * User behavior analytics interface
 */
export interface UserBehaviorAnalytics {
  averageSessionDuration: number;
  bounceRate: number;
  pagesPerSession: number;
  deviceBreakdown: DeviceBreakdown;
  browserBreakdown: BrowserBreakdown;
  locationBreakdown: LocationBreakdown;
}

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  averageLoadTime: number;
  serverResponseTime: number;
  errorRate: number;
  uptime: number;
  apiCallsPerMinute: number;
  memoryUsage: number;
  cpuUsage: number;
}

/**
 * Popular field interface
 */
export interface PopularField {
  name: string;
  type: string;
  usageCount: number;
  completionRate: number;
}

/**
 * Submission trend interface
 */
export interface SubmissionTrend {
  date: string;
  count: number;
  completionRate: number;
}

/**
 * Recent activity interface
 */
export interface RecentActivity {
  id: string;
  type: 'submission' | 'schema_update' | 'user_action';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Peak hour interface
 */
export interface PeakHour {
  hour: number;
  count: number;
  percentage: number;
}

/**
 * Daily trend interface
 */
export interface DailyTrend {
  date: string;
  submissions: number;
  completions: number;
  abandonments: number;
}

/**
 * Common value interface
 */
export interface CommonValue {
  value: string;
  count: number;
  percentage: number;
}

/**
 * Validation error interface
 */
export interface ValidationError {
  error: string;
  count: number;
  percentage: number;
}

/**
 * Device breakdown interface
 */
export interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
}

/**
 * Browser breakdown interface
 */
export interface BrowserBreakdown {
  chrome: number;
  firefox: number;
  safari: number;
  edge: number;
  other: number;
}

/**
 * Location breakdown interface
 */
export interface LocationBreakdown {
  [country: string]: number;
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;
