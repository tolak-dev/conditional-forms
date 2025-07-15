import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useConditionalFieldState } from "../../../hooks/useConditionalFieldState";
import { CheckBoxInputProps } from "../../../types/formSchema";


export const CheckboxInput: React.FC<CheckBoxInputProps> = React.memo(
  ({ field }) => {
    const { name, label, validation, readOnly, ui } = field;
    const { control } = useFormContext();
    const { isVisible, isReadOnly } = useConditionalFieldState(field);

    if (!isVisible) return null;

    const effectiveReadOnly = readOnly || isReadOnly;

    return (
      <div style={{ gridColumn: `span ${ui?.colSpan?.md ?? 12}` }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Controller
              name={name}
              control={control}
              rules={validation}
              render={({ field: controllerField }) => (
                <input
                  data-testid={`input-${name}`}
                  type="checkbox"
                  name={controllerField.name}
                  ref={controllerField.ref}
                  checked={!!controllerField.value}
                  onChange={(e) => controllerField.onChange(e.target.checked)}
                  onBlur={controllerField.onBlur}
                  disabled={effectiveReadOnly}
                  readOnly={effectiveReadOnly}
                />
              )}
            />
            {label}
          </label>
        </div>
      </div>
    );
  }
);
