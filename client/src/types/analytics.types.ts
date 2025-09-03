export interface AnalyticsData {
  totalSubmissions: number;
  submissionsByGender?: Record<string, number>;
  averageAge?: number;
  submissionsByDate?: Record<string, number>;
  topFormFields?: Record<string, number>;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export type AnalyticsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: AnalyticsData }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };
