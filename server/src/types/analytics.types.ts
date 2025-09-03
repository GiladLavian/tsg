export interface AnalyticsData {
  totalSubmissions: number;
  submissionsByGender?: Record<string, number>;
  averageAge?: number;
  submissionsByDate?: Record<string, number>;
  topFormFields?: Record<string, number>;
}
