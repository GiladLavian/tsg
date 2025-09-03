import React, { useCallback, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import { Button } from '../common/button';
import { DynamicField } from './dynamic-field';
import { FormSchema } from '../../types/form.types';
import { useFormState } from '../../hooks/useFormState';
import { useDashboard } from '../../context/dashboard.context';
import { formatFormData, getInitialFormValues } from '../../utils/validation.utils';

interface DynamicFormProps {
  schema: FormSchema;
  onSubmitSuccess?: (data: any) => void;
  onSubmitError?: (error: string) => void;
}

/**
 * Dynamic form component that renders fields based on schema and handles submission
 */
export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const { state: dashboardState, actions: dashboardActions } = useDashboard();
  const {
    formState,
    setFieldValue,
    validateSingleField,
    validateForm,
    resetForm,
    setFormData,
  } = useFormState(schema.fields);

  // Initialize form with default values
  useEffect(() => {
    const initialValues = getInitialFormValues(schema.fields);
    setFormData(initialValues);
  }, [schema.fields, setFormData]);

  // Handle field change
  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setFieldValue(fieldName, value);
  }, [setFieldValue]);

  // Handle field blur (validation)
  const handleFieldBlur = useCallback((fieldName: string) => {
    const value = formState.data[fieldName];
    validateSingleField(fieldName, value);
  }, [formState.data, validateSingleField]);

  // Handle form submission
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      // Format data for submission
      const formattedData = formatFormData(formState.data, schema.fields);
      
      // Submit form
      await dashboardActions.submitForm(formattedData);
      
      // Reset form on success
      resetForm();
      
      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess(formattedData);
      }
    } catch (error: any) {
      // Call error callback
      if (onSubmitError) {
        onSubmitError(error.message);
      }
    }
  }, [
    validateForm,
    formState.data,
    schema.fields,
    dashboardActions,
    resetForm,
    onSubmitSuccess,
    onSubmitError,
  ]);

  // Handle form reset
  const handleReset = useCallback(() => {
    resetForm();
    dashboardActions.clearErrors();
  }, [resetForm, dashboardActions]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Form Header */}
        <Typography variant="h5" gutterBottom>
          {schema.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Typography>
        
        {schema.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {schema.description}
          </Typography>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Error Display */}
        {dashboardState.error.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {dashboardState.error.submit}
          </Alert>
        )}

        {/* Form Fields */}
        <Grid container spacing={2}>
          {schema.fields.map((field) => (
            <Grid item xs={12} sm={field.type === 'text' && field.maxLength && field.maxLength > 100 ? 12 : 6} key={field.name}>
              <DynamicField
                field={field}
                value={formState.data[field.name]}
                error={formState.errors[field.name]}
                onChange={(value) => handleFieldChange(field.name, value)}
                onBlur={() => handleFieldBlur(field.name)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Form Actions */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={dashboardState.loading.submitting}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={dashboardState.loading.submitting}
            loadingText="Submitting..."
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
