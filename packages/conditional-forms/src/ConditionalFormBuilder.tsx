import { Button, Box, Typography, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';

import type { ConditionalFormBuilderProps, Field } from './types/formSchema';
import FieldRenderer from './components/fields/FieldRenderer';
import { evaluateConditions } from './utils/conditionUtils';

export const ConditionalFormBuilder: React.FC<ConditionalFormBuilderProps> = ({
  schema,
  formMethods,
  defaultValues,
  onSubmit,
}) => {
  const { control, reset, handleSubmit } = formMethods;

  // Watch all form values for group-level conditions
  const formValues = useWatch({ control });

  const onReset = () => {
    reset(defaultValues);
  };

  const onSubmitInternal = (data: Record<string, unknown>) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  // Group fields by their assigned group name
  const groupedFields = useMemo(() => {
    return schema.fields.reduce((acc, field) => {
      const groupName = field.group || 'ungrouped';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(field);
      return acc;
    }, {} as Record<string, Field[]>);
  }, [schema.fields]);

  return (
    <Grid
      sx={{
        backgroundColor: schema.ui?.backgroundColor ?? 'background.default',
        padding: schema.ui.formPadding ?? '20px',
        maxWidth: 'lg',
      }}
    >
      {/* Form Title */}
      <Typography
        variant={schema.ui?.titleVariant ?? 'h6'}
        color={schema.ui?.titleColor ?? 'textPrimary'}
        gutterBottom
        sx={{
          textAlign: schema.ui?.titleAlign ?? 'center',
          fontWeight: schema.ui.titleFontWeight ?? 'normal',
        }}
      >
        {schema.title}
      </Typography>

      {/* Form Description */}
      {schema.description && (
        <Typography
          variant={schema.ui?.descriptionVariant ?? 'body1'}
          color={schema.ui?.descriptionColor ?? 'textSecondary'}
          sx={{
            textAlign: schema.ui?.descriptionAlign ?? 'center',
            marginBottom: 4,
          }}
        >
          {schema.description}
        </Typography>
      )}

      {/* Form Content */}
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitInternal)}>
          {schema.groups.map((group) => {
            const groupFields = groupedFields[group.name] || [];

            // Evaluate group visibility conditions
            const isGroupVisible = group.conditions
              ? evaluateConditions(group.conditions, formValues || {})
              : true;

            if (!isGroupVisible || groupFields.length === 0) {
              return null;
            }

            return (
              <Box
                key={group.name}
                sx={{
                  border: group.ui?.border ? '1px solid' : 'none',
                  borderColor: 'divider',
                  borderRadius: group.ui?.borderRadius ?? 2,
                  marginBottom: group.ui?.marginBottom ?? 3,
                  backgroundColor: group.ui?.border
                    ? 'background.paper'
                    : 'transparent',
                  padding: 2,
                }}
              >
                {/* Group Title */}
                <Typography
                  variant={group.ui?.titleVariant ?? 'h6'}
                  gutterBottom
                  sx={{
                    mb: 2,
                    fontWeight: 'medium',
                    color: 'text.primary',
                  }}
                >
                  {group.label}
                </Typography>

                {/* Group Fields Grid */}
                <Grid
                  container
                  spacing={2}
                  columns={group.ui.gridColumns ?? 12}
                >
                  {groupFields.map((field) => (
                    <FieldRenderer key={field.name} field={field} />
                  ))}
                </Grid>
              </Box>
            );
          })}

          {/* Form Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: schema.ui?.buttonGroupJustifyContent ?? 'center',
              gap: 2,
              mt: 4,
              pt: 2,
            }}
          >
            <Button
              type="submit"
              variant={schema.ui?.submitButtonVariant ?? 'contained'}
              color={schema.ui?.submitButtonColor ?? 'primary'}
              size={schema.ui?.submitButtonSize ?? 'large'}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'medium',
              }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant={schema.ui?.resetButtonVariant ?? 'outlined'}
              color={schema.ui?.resetButtonColor ?? 'secondary'}
              size={schema.ui?.resetButtonSize ?? 'large'}
              onClick={onReset}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'medium',
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default ConditionalFormBuilder;
