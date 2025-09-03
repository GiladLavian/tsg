import React, { useEffect } from 'react';
import { SubmissionsList } from '../submissions-list';
import { FormSubmission } from '../../../types/form.types';
import { useDashboard } from '../../../context/dashboard.context';

interface SubmissionsTabProps {
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  isActive: boolean;
  onViewSubmission?: (submission: FormSubmission) => void;
}

/**
 * Submissions Tab Component
 * Displays a list of form submissions with filtering and viewing capabilities
 */
export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
  submissions,
  loading,
  error,
  isActive,
  onViewSubmission,
}) => {
  const { actions } = useDashboard();

  useEffect(() => {
    if (isActive && submissions.length === 0 && !loading && !error) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      actions.fetchSubmissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, submissions.length, loading, error]);

  return (
    <SubmissionsList
      submissions={submissions}
      loading={loading}
      error={error}
      onViewSubmission={onViewSubmission}
    />
  );
};
