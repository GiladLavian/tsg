import React from 'react';
import { SubmissionsList } from '../submissions-list';
import { FormSubmission } from '../../../types/form.types';

interface SubmissionsTabProps {
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
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
  onViewSubmission,
}) => {
  return (
    <SubmissionsList
      submissions={submissions}
      loading={loading}
      error={error}
      onViewSubmission={onViewSubmission}
    />
  );
};
