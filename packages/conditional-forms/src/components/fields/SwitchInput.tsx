import { FormControlLabel, FormHelperText, Switch } from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import type { CheckBoxInputProps } from '../../types/formSchema';

export const SwitchInput: React.FC<CheckBoxInputProps> = React.memo(
  ({ field }) => {
    const { name, label, validation, readOnly } = field;
    const { control, formState } = useFormContext();

    const { isVisible, isReadOnly } = useConditionalFieldState(field);

    const fieldError = formState.errors?.[name] as FieldError;

    if (!isVisible) return null;

    return (
      <Grid size={field.ui.colSpan}>
        <FormControlLabel
          control={
            <Controller
              name={name}
              control={control}
              rules={validation}
              render={({ field: controllerField }) => (
                <Switch
                  {...controllerField}
                  checked={!!controllerField.value}
                  onChange={(e) => controllerField.onChange(e.target.checked)}
                  disabled={readOnly || isReadOnly}
                />
              )}
            />
          }
          label={label}
        />
        <FormHelperText error>{fieldError.message}</FormHelperText>
      </Grid>
    );
  }
);
