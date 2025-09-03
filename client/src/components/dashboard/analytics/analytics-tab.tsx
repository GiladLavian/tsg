import React from 'react';
import { AnalyticsDashboard } from '../analytics-dashboard';
import { AnalyticsData } from '../../../types/analytics.types';

interface AnalyticsTabProps {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Analytics Tab Component
 * Displays comprehensive analytics and metrics about form submissions
 */
export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  data,
  loading,
  error,
}) => {
  return (
    <AnalyticsDashboard
      data={data}
      loading={loading}
      error={error}
    />
  );
};
