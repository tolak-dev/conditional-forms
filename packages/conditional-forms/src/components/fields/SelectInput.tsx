import {
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  InputLabel,
  FormControl,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import type { SelectInputProps } from './../../types/formSchema';

export const SelectInput: React.FC<SelectInputProps> = React.memo(
  ({ field, options }) => {
    const { name, label, validation, readOnly } = field;
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
          render={({ field: controllerField }) => {
            const selectedValue = options?.some(
              (opt) => opt.value === controllerField.value
            )
              ? controllerField.value
              : '';
            return (
              <FormControl
                fullWidth
                error={!!fieldError}
                disabled={effectiveReadOnly}
                variant="outlined"
              >
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                  labelId={`${name}-label`}
                  id={name}
                  label={label}
                  fullWidth
                  name={controllerField.name}
                  inputRef={controllerField.ref}
                  onChange={controllerField.onChange}
                  onBlur={controllerField.onBlur}
                  inputProps={{ 'aria-label': label }}
                  readOnly={effectiveReadOnly}
                  value={selectedValue ?? ''}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {fieldError && (
                  <FormHelperText error>{fieldError.message}</FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
      </Grid>
    );
  }
);
