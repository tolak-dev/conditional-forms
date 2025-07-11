import { TextField, Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { FileUploadInputProps } from '../../types/formSchema';

export const FileUploadInput: React.FC<FileUploadInputProps> = React.memo(
  ({ field }) => {
    const { name, label, validation, ui } = field;
    const { control, formState } = useFormContext();

    const { isVisible } = useConditionalFieldState(field);

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
              type="file"
              fullWidth
              variant={ui?.variant ?? 'outlined'}
              label={label}
              error={!!fieldError}
              helperText={fieldError.message}
              onChange={(e) =>
                controllerField.onChange(
                  (e.target as HTMLInputElement).files?.[0] ?? null
                )
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        />
      </Grid>
    );
  }
);
