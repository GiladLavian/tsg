import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'children'> {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

/**
 * Custom Button component with loading state
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  loadingText,
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : props.startIcon}
    >
      {loading ? (loadingText || 'Loading...') : children}
    </MuiButton>
  );
};
