import type { ConditionRule, Condition, Field } from '../types/formSchema';

export const evaluateRule = (
  rule: ConditionRule,
  formValues: Record<string, unknown>
): boolean => {
  const fieldValue = formValues[rule.field];

  const valueToCompare = Array.isArray(fieldValue) ? fieldValue[0] : fieldValue;

  switch (rule.operator) {
    case 'equals':
      return valueToCompare === rule.value;
    case 'notEquals':
      return valueToCompare !== rule.value;
    case 'greaterThan':
      return (
        typeof valueToCompare === 'number' &&
        typeof rule.value === 'number' &&
        valueToCompare > rule.value
      );
    case 'lessThan':
      return (
        typeof valueToCompare === 'number' &&
        typeof rule.value === 'number' &&
        valueToCompare < rule.value
      );
    case 'contains':
      return (
        typeof valueToCompare === 'string' &&
        typeof rule.value === 'string' &&
        valueToCompare.includes(rule.value)
      );
    case 'notContains':
      return (
        typeof valueToCompare === 'string' &&
        typeof rule.value === 'string' &&
        !valueToCompare.includes(rule.value)
      );

    default:
      return false;
  }
};

export const evaluateConditions = (
  conditions: Condition[],
  formValues: Record<string, unknown>
): { isVisible: boolean; isReadOnly: boolean } => {
  let isVisible = true;
  let isReadOnly = false;

  for (const conditionGroup of conditions) {
    const rulesResults = conditionGroup.rules.map((rule) =>
      evaluateRule(rule, formValues)
    );

    let groupResult: boolean;

    switch (conditionGroup.operator) {
      case 'AND':
        groupResult = rulesResults.every(Boolean);
        break;
      case 'OR':
        groupResult = rulesResults.some(Boolean);
        break;
      case 'NOT':
        groupResult = !rulesResults.every(Boolean);
        break;
      default:
        groupResult = false;
    }

    if (conditionGroup.effect === 'visibility' && !groupResult) {
      isVisible = false;
    }

    if (conditionGroup.effect === 'readOnly' && groupResult) {
      isReadOnly = true;
    }
  }

  return { isVisible, isReadOnly };
};

export const evaluateFieldConditions = (
  field: Field,
  watchedValues: Record<string, unknown>
) => {
  if (!field.conditions) {
    return {
      isVisible: true,
      isReadOnly: field.readOnly || false,
    };
  }

  const { isVisible, isReadOnly } = evaluateConditions(
    field.conditions,
    watchedValues
  );

  return {
    isVisible,
    isReadOnly: field.readOnly || isReadOnly, // fallback if field has static readonly
  };
};

// Helper function to extract dependent field names from conditions
export const getDependentFields = (field: Field): string[] => {
  if (!field.conditions) return [];

  const dependentFields: string[] = [];

  field.conditions.forEach((condition) => {
    condition.rules.forEach((rule) => {
      if (!dependentFields.includes(rule.field)) {
        dependentFields.push(rule.field);
      }
    });
  });

  return dependentFields;
};
