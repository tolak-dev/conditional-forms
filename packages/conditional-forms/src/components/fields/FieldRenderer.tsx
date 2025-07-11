import { Typography } from '@mui/material';
import React from 'react';

import { CheckboxInput } from './CheckBox';
import { CheckboxGroupInput } from './CheckboxGroupInput';
import { DateInput } from './DateInput';
import { EmailInput } from './EmailInput';
import { FileUploadInput } from './FileUploadInput';
import { MultilineTextInput } from './MultilineTextInput';
import { NumberInput } from './NumberInput';
import { PasswordInput } from './PasswordInput';
import { RadioInput } from './RadioInput';
import { SelectInput } from './SelectInput';
import { SwitchInput } from './SwitchInput';
import { TelInput } from './TelInput';
import { TextInput } from './TextInput';
import { TimeInput } from './TimeInput';
import type { FieldRendererProps } from '../../types/formSchema';

const FieldRenderer: React.FC<FieldRendererProps> = React.memo(({ field }) => {
  const { ui = {}, type } = field;

  const commonProps = {
    name: field.name,
    label: field.label,
    placeholder: field.placeholder,
    validation: field.validation,
    readOnly: field.readOnly,
    field,
    ui,
  };

  switch (type) {
    case 'text':
      return <TextInput {...commonProps} />;
    case 'number':
      return <NumberInput {...commonProps} />;
    case 'email':
      return <EmailInput {...commonProps} />;
    case 'tel':
      return <TelInput {...commonProps} />;
    case 'password':
      return <PasswordInput {...commonProps} />;
    case 'multiline-text':
      return <MultilineTextInput {...commonProps} />;
    case 'select':
      return <SelectInput {...commonProps} options={field.options} />;
    case 'radio':
      return <RadioInput {...commonProps} options={field.options} />;
    case 'checkbox':
      return <CheckboxInput {...commonProps} />;
    case 'switch':
      return <SwitchInput {...commonProps} />;
    case 'date':
      return <DateInput {...commonProps} />;
    case 'time':
      return <TimeInput {...commonProps} />;
    case 'checkbox-group':
      return <CheckboxGroupInput {...commonProps} options={field.options} />;
    case 'file':
      return <FileUploadInput {...commonProps} />;
    default:
      return (
        <Typography color="error" variant="body2">
          Unsupported field type: {type}
        </Typography>
      );
  }
});

export default FieldRenderer;
