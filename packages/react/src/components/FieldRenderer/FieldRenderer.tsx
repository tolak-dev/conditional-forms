import React from "react";

import { TextInput, NumberInput, SelectInput, MultilineTextInput, RadioInput } from "../fields"

import { FieldRendererProps } from "../../types/formSchema";
import { CheckboxInput } from "../fields/CheckBox/CheckBox";

export const FieldRenderer: React.FC<FieldRendererProps> = React.memo(
  ({ field }) => {
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
      case "text":
        return <TextInput {...commonProps} />;
      case "number":
        return <NumberInput {...commonProps} />;
      case "multiline-text":
        return <MultilineTextInput {...commonProps} />;
      case "select":
        return <SelectInput {...commonProps} options={field.options} />;
      case "radio":
        return <RadioInput {...commonProps} options={field.options} />;
      case "checkbox":
        return <CheckboxInput {...commonProps} />;
      default:
        return (
          <span style={{ color: "red" }}>
            Unsupported field type: {type}
          </span>
        );
    }
  }
);
