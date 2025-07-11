import { TextField } from '@mui/material';
import { Grid, styled } from '@mui/system';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import type { BaseInputProps } from '../../types/formSchema';
import { theme } from './../../styles/theme';

const StyledTextField = styled(TextField)({
  marginBottom: theme.spacing(2),
});

export const NumberInput: React.FC<BaseInputProps> = React.memo(({ field }) => {
  const { name, label, placeholder, validation } = field;

  const { control, formState } = useFormContext();

  const { isVisible, isReadOnly } = useConditionalFieldState(field);

  if (!isVisible) return null;

  const fieldError = formState.errors?.[name] as FieldError;

  return (
    <Grid size={field.ui.colSpan}>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field: controllerField }) => (
          <StyledTextField
            data-testid={`input-${name}`}
            label={label}
            name={controllerField.name}
            inputRef={controllerField.ref}
            value={controllerField.value ?? ''}
            onChange={(e: { target: { value: any } }) =>
              controllerField.onChange(e.target.value)
            }
            onBlur={controllerField.onBlur}
            error={!!fieldError}
            helperText={fieldError?.message}
            placeholder={placeholder}
            fullWidth
            variant="outlined"
            type="number"
            disabled={isReadOnly}
            sx={{ display: 'flex' }}
            slotProps={{
              input: {
                readOnly: isReadOnly,
              },
            }}
          />
        )}
      />
    </Grid>
  );
});
