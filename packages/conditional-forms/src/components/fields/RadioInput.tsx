import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Grid,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import type { RadioInputProps } from '../../types/formSchema';

export const RadioInput: React.FC<RadioInputProps> = React.memo(
  ({ field, options }) => {
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
            <FormControl
              component="fieldset"
              error={!!fieldError}
              disabled={effectiveReadOnly}
            >
              <FormLabel component="legend">{label}</FormLabel>
              <RadioGroup
                name={controllerField.name}
                value={controllerField.value ?? ''}
                onChange={(e) => controllerField.onChange(e.target.value)}
                onBlur={controllerField.onBlur}
                row={ui?.row ?? false}
              >
                {options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    disabled={effectiveReadOnly}
                  />
                ))}
              </RadioGroup>
              <FormHelperText error>{fieldError.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    );
  }
);
