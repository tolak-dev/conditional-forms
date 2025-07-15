import React from "react";
import { Controller, useFormContext, type FieldError } from "react-hook-form";
import type { BaseInputProps } from "../../../types/formSchema";
import { useConditionalFieldState } from "../../../hooks/useConditionalFieldState";

export const NumberInput: React.FC<BaseInputProps> = React.memo(({ field }) => {
  const { name, label, placeholder, validation, readOnly, ui } = field;

  const { control, formState } = useFormContext();
  const { isVisible, isReadOnly } = useConditionalFieldState(field);
  const fieldError = formState.errors?.[name] as FieldError;

  if (!isVisible) return null;

  const effectiveReadOnly = readOnly || isReadOnly;

  return (
    <div style={{ gridColumn: `span ${ui?.colSpan?.md ?? 12}` }}>
      <div style={{ marginBottom: "1rem" }}>
        {label && (
          <label htmlFor={name} style={{ display: "block", fontWeight: 500 }}>
            {label}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field: controllerField }) => (
            <input
              data-testid={`input-${name}`}
              id={name}
              type="number"
              name={controllerField.name}
              ref={controllerField.ref}
              value={controllerField.value ?? ""}
              onChange={(e) => controllerField.onChange(e.target.value)}
              onBlur={controllerField.onBlur}
              placeholder={placeholder}
              readOnly={effectiveReadOnly}
              disabled={effectiveReadOnly}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: fieldError ? "1px solid red" : "1px solid #ccc",
                backgroundColor: effectiveReadOnly ? "#f5f5f5" : "white",
                cursor: effectiveReadOnly ? "not-allowed" : "text",
              }}
            />
          )}
        />
        {fieldError && (
          <div
            style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}
          >
            {fieldError.message}
          </div>
        )}
      </div>
    </div>
  );
});
