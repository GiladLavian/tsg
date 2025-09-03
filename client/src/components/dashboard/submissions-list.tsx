import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { FormSubmission } from '../../types/form.types';
import { LoadingCard, ErrorCard, EmptyStateCard } from '../common/cards';

interface SubmissionsListProps {
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  onViewSubmission?: (submission: FormSubmission) => void;
}

/**
 * Component to display a list of form submissions
 */
export const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  loading,
  error,
  onViewSubmission,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get display value for table cell
  const getDisplayValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // Get common fields from submissions for table headers
  const getCommonFields = () => {
    if (submissions.length === 0) return [];
    
    const allFields = new Set<string>();
    submissions.forEach(submission => {
      Object.keys(submission.data || {}).forEach(field => allFields.add(field));
    });
    
    return Array.from(allFields).slice(0, 4); // Limit to first 4 fields for table width
  };

  if (loading) {
    return <LoadingCard title="Loading submissions..." height={400} lines={5} />;
  }

  if (error) {
    return (
      <ErrorCard
        title="Failed to load submissions"
        message={error}
      />
    );
  }

  if (submissions.length === 0) {
    return (
      <EmptyStateCard
        title="No submissions yet"
        message="Form submissions will appear here once users start submitting the form."
      />
    );
  }

  const commonFields = getCommonFields();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Recent Submissions
          </Typography>
          <Chip 
            label={`${submissions.length} total`} 
            color="primary" 
            variant="outlined" 
          />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Submitted</TableCell>
                {commonFields.map(field => (
                  <TableCell key={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableCell>
                ))}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.slice(0, 10).map((submission) => (
                <TableRow key={submission.id} hover>
                  <TableCell>
                    <Typography variant="body2">
                      {submission.createdAt ? formatDate(submission.createdAt) : '-'}
                    </Typography>
                  </TableCell>
                  {commonFields.map(field => (
                    <TableCell key={field}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {getDisplayValue(submission.data?.[field])}
                      </Typography>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {onViewSubmission && (
                      <Tooltip title="View details">
                        <IconButton 
                          size="small"
                          onClick={() => onViewSubmission(submission)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {submissions.length > 10 && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing 10 of {submissions.length} submissions
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
