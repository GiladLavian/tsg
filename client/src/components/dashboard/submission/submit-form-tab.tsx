import React from 'react';
import { Grid } from '@mui/material';
import { DynamicForm } from '../../form/dynamic-form';
import { FormSchema } from '../../../types/form.types';

interface SubmitFormTabProps {
  schema: FormSchema;
  onSubmitSuccess?: (data: any) => void;
  onSubmitError?: (error: string) => void;
}

/**
 * Submit Form Tab Component
 * Displays a dynamic form for users to submit data
 */
export const SubmitFormTab: React.FC<SubmitFormTabProps> = ({
  schema,
  onSubmitSuccess,
  onSubmitError,
}) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <DynamicForm
          schema={schema}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitError={onSubmitError}
        />
      </Grid>
    </Grid>
  );
};
