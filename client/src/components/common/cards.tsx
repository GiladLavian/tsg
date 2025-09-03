import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Alert,
  Box,
  Skeleton 
} from '@mui/material';

interface LoadingCardProps {
  title?: string;
  height?: number | string;
  lines?: number;
}

/**
 * Loading skeleton card component
 */
export const LoadingCard: React.FC<LoadingCardProps> = ({ 
  title: _title = 'Loading...', 
  height = 200,
  lines = 3 
}) => {
  return (
    <Card sx={{ height }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Skeleton width="40%" />
        </Typography>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} sx={{ mb: 1 }} />
        ))}
      </CardContent>
    </Card>
  );
};

interface ErrorCardProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

/**
 * Error display card component
 */
export const ErrorCard: React.FC<ErrorCardProps> = ({ 
  title = 'Error', 
  message, 
  action 
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="error">
          {title}
        </Typography>
        <Alert severity="error" sx={{ mb: action ? 2 : 0 }}>
          {message}
        </Alert>
        {action && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {action}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

interface EmptyStateCardProps {
  title: string;
  message: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Empty state card component
 */
export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title,
  message,
  action,
  icon
}) => {
  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        {icon && (
          <Box sx={{ mb: 2, color: 'text.secondary' }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: action ? 3 : 0 }}>
          {message}
        </Typography>
        {action && action}
      </CardContent>
    </Card>
  );
};
