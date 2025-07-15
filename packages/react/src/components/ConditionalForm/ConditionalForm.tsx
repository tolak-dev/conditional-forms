import React, { useMemo } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import type { ConditionalFormProps, Field } from "../../types/formSchema";
import { FieldRenderer } from "../FieldRenderer/FieldRenderer";
import { evaluateConditions } from "../../utils/conditionUtils";
import { getDefaultValuesFromSchema } from "../../utils/getDefaultValuesFromSchema";

export const ConditionalForm: React.FC<ConditionalFormProps> = ({
  schema,
  formMethods,
  onSubmit,
}) => {

  const { control, reset, handleSubmit } = formMethods;

  const formValues = useWatch({ control });

  const defaultValues = getDefaultValuesFromSchema(schema)

  const onReset = () => reset(defaultValues);

  const onSubmitInternal = (data: Record<string, unknown>) => {
    if (onSubmit) onSubmit(data);
  };

  const groupedFields = useMemo(() => {
    return schema.fields.reduce((acc, field) => {
      const groupName = field.group || "ungrouped";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(field);
      return acc;
    }, {} as Record<string, Field[]>);
  }, [schema.fields]);

  return (
    <div
      style={{
        backgroundColor: schema.ui?.backgroundColor ?? "#fff",
        padding: schema.ui?.formPadding ?? "20px",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: schema.ui?.titleAlign ?? "center",
          fontWeight: schema.ui?.titleFontWeight ?? "normal",
          color: schema.ui?.titleColor ?? "#000",
          marginBottom: "1rem",
        }}
      >
        {schema.title}
      </h2>

      {/* Description */}
      {schema.description && (
        <p
          style={{
            textAlign: schema.ui?.descriptionAlign ?? "center",
            color: schema.ui?.descriptionColor ?? "#666",
            marginBottom: "2rem",
          }}
        >
          {schema.description}
        </p>
      )}

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitInternal)}>
          {schema.groups.map((group) => {
            const groupFields = groupedFields[group.name] || [];

            const isGroupVisible = group.conditions
              ? evaluateConditions(group.conditions, formValues || {})
              : true;

            if (!isGroupVisible || groupFields.length === 0) return null;

            return (
              <div
                key={group.name}
                style={{
                  border: group.ui?.border ? "1px solid #ccc" : "none",
                  borderRadius: group.ui?.borderRadius ?? "8px",
                  marginBottom: group.ui?.marginBottom ?? "24px",
                  padding: group.ui?.padding ?? "16px",
                  backgroundColor: group.ui?.border ? "#f9f9f9" : "transparent",
                }}
              >
                <h3
                  style={{
                    marginBottom: "16px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  {group.label}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${group.ui?.gridColumns ?? 12}, 1fr)`,
                    gap: `${group.ui?.spacing ?? 16}px`,
                  }}
                >
                  {groupFields.map((field) => (
                    <FieldRenderer key={field.name} field={field} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent:
                schema.ui?.buttonGroupJustifyContent ?? "center",
              gap: "16px",
              marginTop: "32px",
              paddingTop: "16px",
            }}
          >
            <button type="submit">Submit</button>
            <button type="button" onClick={onReset}>
              Reset
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
