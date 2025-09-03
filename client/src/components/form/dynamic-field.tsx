import React, { useCallback } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormField } from '../../types/form.types';

interface DynamicFieldProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onBlur?: () => void;
}

/**
 * Dynamic form field component that renders different input types based on field configuration
 */
export const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  value,
  error,
  onChange,
  onBlur,
}) => {
  const handleChange = useCallback((newValue: any) => {
    onChange(newValue);
  }, [onChange]);

  const handleBlur = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  const commonProps = {
    fullWidth: true,
    margin: 'normal' as const,
    required: field.required,
    error: !!error,
    helperText: error,
    onBlur: handleBlur,
  };

  switch (field.type) {
    case 'text':
      return (
        <TextField
          {...commonProps}
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{
            minLength: field.minLength,
            maxLength: field.maxLength,
          }}
        />
      );

    case 'email':
      return (
        <TextField
          {...commonProps}
          type="email"
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{
            maxLength: field.maxLength,
          }}
        />
      );

    case 'password':
      return (
        <TextField
          {...commonProps}
          type="password"
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{
            minLength: field.minLength,
            maxLength: field.maxLength,
          }}
        />
      );

    case 'number':
      return (
        <TextField
          {...commonProps}
          type="number"
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
          inputProps={{
            min: field.min,
            max: field.max,
          }}
        />
      );

    case 'date':
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ mt: 2, mb: 1 }}>
            <DatePicker
              label={field.label}
              value={value ? dayjs(value) : null}
              onChange={(newValue) => handleChange(newValue ? newValue.toISOString() : '')}
              slotProps={{
                textField: {
                  ...commonProps,
                  margin: 'none',
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      );

    case 'dropdown':
      const formControlProps = {
        fullWidth: true,
        margin: 'normal' as const,
        required: field.required,
        error: !!error,
      };
      
      return (
        <FormControl {...formControlProps}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={value || ''}
            label={field.label}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      );

    default:
      return (
        <TextField
          {...commonProps}
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
  }
};
