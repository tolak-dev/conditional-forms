import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { theme } from '../../styles/theme';
import type { BaseInputProps } from '../../types/formSchema';

const StyledTextField = styled(TextField)({
  marginBottom: theme.spacing(2),
});

export const MultilineTextInput: React.FC<BaseInputProps> = React.memo(
  ({ field }) => {
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
            <StyledTextField
              name={controllerField.name}
              inputRef={controllerField.ref}
              value={controllerField.value ?? ''}
              onChange={(e: { target: { value: any } }) =>
                controllerField.onChange(e.target.value)
              }
              onBlur={controllerField.onBlur}
              label={label}
              placeholder={placeholder}
              fullWidth
              multiline
              rows={ui?.rows ?? 4}
              variant={ui?.variant ?? 'outlined'}
              error={!!fieldError}
              helperText={fieldError?.message}
              disabled={effectiveReadOnly}
            />
          )}
        />
      </Grid>
    );
  }
);
