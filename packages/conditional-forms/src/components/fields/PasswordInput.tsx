import { TextField } from '@mui/material';
import { Grid } from '@mui/system';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import type { BaseInputProps } from '../../types/formSchema';

export const PasswordInput: React.FC<BaseInputProps> = React.memo(
  ({ field }) => {
    const { name, label, placeholder, validation, readOnly, ui } = field;
    const { control, formState } = useFormContext();

    const { isVisible, isReadOnly } = useConditionalFieldState(field);

    const fieldError = formState.errors?.[name] as FieldError;

    if (!isVisible) return null;

    return (
      <Grid size={field.ui.colSpan}>
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field: controllerField }) => (
            <TextField
              {...controllerField}
              type="password"
              label={label}
              placeholder={placeholder}
              fullWidth
              variant={ui?.variant ?? 'outlined'}
              error={!!fieldError}
              helperText={fieldError.message}
              disabled={readOnly || isReadOnly}
            />
          )}
        />
      </Grid>
    );
  }
);
