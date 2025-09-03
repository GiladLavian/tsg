import React, { useEffect } from 'react';
import { AnalyticsDashboard } from '../analytics-dashboard';
import { AnalyticsData } from '../../../types/analytics.types';
import { useDashboard } from '../../../context/dashboard.context';

interface AnalyticsTabProps {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  isActive: boolean;
}

/**
 * Analytics Tab Component
 * Displays comprehensive analytics and metrics about form submissions
 */
export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  data,
  loading,
  error,
  isActive,
}) => {
  const { actions } = useDashboard();

  useEffect(() => {
    if (isActive && !data && !loading && !error) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      actions.fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, data, loading, error]);

  return (
    <AnalyticsDashboard
      data={data}
      loading={loading}
      error={error}
    />
  );
};
