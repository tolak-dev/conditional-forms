import { FormSchema } from '../types/formSchema';

export const getDefaultValuesFromSchema = (
  schema: FormSchema
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const field of schema.fields) {
    if (field.defaultValue !== undefined) {
      result[field.name] = field.defaultValue;
    }
  }
  return result;
};
