import { TextField, Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { EmailInputProps } from '../../types/formSchema';

export const EmailInput: React.FC<EmailInputProps> = React.memo(({ field }) => {
  const { name, label, placeholder, validation, readOnly, ui } = field;
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
            name={controllerField.name}
            inputRef={controllerField.ref}
            value={controllerField.value ?? ''}
            onChange={(e) => controllerField.onChange(e.target.value)}
            onBlur={controllerField.onBlur}
            label={label}
            placeholder={placeholder}
            fullWidth
            variant={ui?.variant ?? 'outlined'}
            type="email"
            error={!!fieldError}
            helperText={fieldError.message}
            disabled={effectiveReadOnly}
          />
        )}
      />
    </Grid>
  );
});
