import { FormControlLabel, Checkbox, Grid } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useConditionalFieldState } from '../../hooks/useConditionalFieldState';
import { theme } from '../../styles/theme';
import { CheckBoxInputProps } from '../../types/formSchema';

export const CheckboxInput: React.FC<CheckBoxInputProps> = React.memo(
  ({ field }) => {
    const { name, label, validation, readOnly } = field;
    const { control } = useFormContext();

    const { isVisible, isReadOnly } = useConditionalFieldState(field);

    if (!isVisible) {
      return null;
    }

    const effectiveReadOnly = readOnly || isReadOnly;

    return (
      <Grid size={field.ui.colSpan}>
        <FormControlLabel
          control={
            <Controller
              name={name}
              control={control}
              rules={validation}
              render={({ field: controllerField }) => (
                <Checkbox
                  {...controllerField}
                  checked={!!controllerField.value}
                  readOnly={effectiveReadOnly}
                  disabled={effectiveReadOnly}
                />
              )}
            />
          }
          label={label}
          sx={{ marginBottom: theme.spacing(2) }}
        />
      </Grid>
    );
  }
);
