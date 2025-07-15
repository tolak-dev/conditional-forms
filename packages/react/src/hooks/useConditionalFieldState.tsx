import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  evaluateFieldConditions,
  getDependentFields,
} from "../utils/conditionUtils";
import type { Field } from "../types/formSchema";

export const useConditionalFieldState = (field: Field) => {
  const { control } = useFormContext();

  const dependentFields = useMemo(() => getDependentFields(field), [field]);

  const watchedValues = useWatch({
    control,
    name: dependentFields.length > 0 ? dependentFields : [],
  });

  const watchedFieldsObject = useMemo(() => {
    if (dependentFields.length === 0) return {};
    const values = Array.isArray(watchedValues)
      ? watchedValues
      : [watchedValues];
    return dependentFields.reduce(
      (acc, key, index) => {
        acc[key] = values[index];
        return acc;
      },
      {} as Record<string, unknown>
    );
  }, [dependentFields, watchedValues]);

  const { isVisible, isReadOnly } = useMemo(() => {
    return evaluateFieldConditions(field, watchedFieldsObject);
  }, [field, watchedFieldsObject]);

  return {
    isVisible,
    isReadOnly,
  };
};
