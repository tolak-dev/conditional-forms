import React from "react";
import { Controller, useFormContext, type FieldError } from "react-hook-form";
import type { RadioInputProps } from "../../../types/formSchema";
import { useConditionalFieldState } from "../../../hooks/useConditionalFieldState";

export const RadioInput: React.FC<RadioInputProps> = React.memo(
  ({ field, options }) => {
    const { name, label, validation, readOnly, ui } = field;

    const { control, formState } = useFormContext();
    const { isVisible, isReadOnly } = useConditionalFieldState(field);
    const fieldError = formState.errors?.[name] as FieldError;

    if (!isVisible) return null;

    const effectiveReadOnly = readOnly || isReadOnly;
    const isRow = ui?.row ?? false;

    return (
      <div style={{ gridColumn: `span ${ui?.colSpan?.md ?? 12}` }}>
        <div style={{ marginBottom: "1rem" }}>
          {label && (
            <div style={{ fontWeight: 500, marginBottom: "0.5rem" }}>
              {label}
            </div>
          )}
          <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field: controllerField }) => (
              <div
                style={{
                  display: isRow ? "flex" : "block",
                  gap: isRow ? "1rem" : undefined,
                }}
              >
                {options?.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: isRow ? 0 : "0.5rem",
                      marginRight: isRow ? "1rem" : undefined,
                    }}
                  >
                    <input
                      data-testid={`input-${name}`}
                      type="radio"
                      name={controllerField.name}
                      value={option.value}
                      checked={controllerField.value === option.value}
                      onChange={() =>
                        controllerField.onChange(option.value)
                      }
                      onBlur={controllerField.onBlur}
                      disabled={effectiveReadOnly}
                    />
                    <span style={{ marginLeft: "0.4rem" }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />
          {fieldError && (
            <div
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {fieldError.message}
            </div>
          )}
        </div>
      </div>
    );
  }
);
