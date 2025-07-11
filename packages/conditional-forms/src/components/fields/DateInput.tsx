import { TextField, Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { BaseInputProps } from '../../types/formSchema';

export const DateInput: React.FC<BaseInputProps> = React.memo(({ field }) => {
  const { name, label, validation, readOnly, ui } = field;
  const { control, formState } = useFormContext();

  const { isVisible, isReadOnly } = useConditionalFieldState(field);

  const fieldError = formState.errors?.[name] as FieldError;

  if (!isVisible) return null;
  const effectiveReadOnly = readOnly || isReadOnly;

  return (
    <Grid size={field.ui.colSpan}>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field: controllerField }) => (
          <TextField
            data-testid={`input-${name}`}
            {...controllerField}
            type="date"
            label={label}
            fullWidth
            variant={ui?.variant ?? 'outlined'}
            error={!!fieldError}
            helperText={fieldError.message}
            disabled={effectiveReadOnly}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        )}
      />
    </Grid>
  );
});
