import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext, type FieldError } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { CheckBoxGroupInputProps } from '../../types/formSchema';

export const CheckboxGroupInput: React.FC<CheckBoxGroupInputProps> = React.memo(
  ({ field, options }) => {
    const { name, validation, readOnly } = field;
    const { control, formState } = useFormContext();
    const { isVisible, isReadOnly } = useConditionalFieldState(field);

    const fieldError = formState.errors?.[name] as FieldError;

    if (!isVisible) return null;

    return (
      <Grid size={field.ui.colSpan}>
        <FormControl error={!!fieldError} component="fieldset">
          <FormGroup>
            <Controller
              name={name}
              control={control}
              rules={validation}
              render={({ field: controllerField }) => (
                <span>
                  {options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      label={option.label}
                      control={
                        <Checkbox
                          value={option.value}
                          checked={controllerField.value?.includes(
                            option.value
                          )}
                          disabled={readOnly || isReadOnly}
                          onChange={(e) => {
                            const selected = controllerField.value || [];
                            const updated = e.target.checked
                              ? [...selected, option.value]
                              : selected.filter(
                                  (v: string) => v !== option.value
                                );
                            controllerField.onChange(updated);
                          }}
                        />
                      }
                    />
                  ))}
                </span>
              )}
            />
          </FormGroup>
          <FormHelperText error>{fieldError.message}</FormHelperText>
        </FormControl>
      </Grid>
    );
  }
);
