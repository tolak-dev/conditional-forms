import type { SxProps, Theme } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import type { RegisterOptions, UseFormReturn } from 'react-hook-form';

// --- 1. UI-related Types ---
export interface UISettings {
  formVariant?: 'elevation' | 'outlined' | undefined;
  backgroundColor?: 'background.default' | 'background.paper' | undefined;
  formElevation?: number;
  formPadding?: string;
  titleVariant?: TypographyProps['variant'];
  titleColor?: 'textPrimary' | 'textSecondary';
  titleFontWeight?: 'light' | 'lighter' | 'normal' | 'bald' | 'balder';
  titleAlign?: 'left' | 'center' | 'right';
  descriptionVariant?: TypographyProps['variant'];
  descriptionColor?: 'textPrimary' | 'textSecondary';
  descriptionAlign?: 'left' | 'center' | 'right';
  buttonGroupJustifyContent?: 'flex-start' | 'center' | 'flex-end';
  submitButtonVariant?: 'contained' | 'outlined' | 'text';
  submitButtonColor?: 'primary' | 'secondary';
  submitButtonSize?: 'small' | 'medium' | 'large';
  resetButtonVariant?: 'contained' | 'outlined' | 'text';
  resetButtonColor?: 'primary' | 'secondary';
  resetButtonSize?: 'small' | 'medium' | 'large';
}

// --- 3. Condition Types ---
export type ConditionOperator =
  | 'equals'
  | 'notEquals'
  | 'greaterThan'
  | 'lessThan'
  | 'contains'
  | 'notContains';

export type ConditionLogicalOperator = 'AND' | 'OR' | 'NOT';

export type ConditionEffect = 'visibility' | 'readOnly';

export interface ConditionRule<T = unknown> {
  field: string;
  operator: ConditionOperator;
  value: T;
}

export interface Condition {
  operator: ConditionLogicalOperator;
  rules: ConditionRule[];
  effect?: ConditionEffect;
}

// --- 4. Field Types ---
export interface Option {
  label: string;
  value: string | number;
}

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'tel'
  | 'password'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group'
  | 'switch'
  | 'multiline-text'
  | 'date'
  | 'time'
  | 'file';

export interface FieldUIConfig {
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  margin?: 'normal' | 'dense' | 'none';
  rows?: number;
  color?: 'primary' | 'secondary';
  row?: boolean; // For radio buttons
  [key: string]: unknown;
}

export interface BaseField {
  name: string;
  label: string;
  group: string;
  readOnly?: boolean;
  placeholder?: string;
  validation?: RegisterOptions;
  defaultValue?: unknown;
  conditions?: Condition[];
  ui: FieldUIConfig;
}

export interface TextField extends BaseField {
  type: 'text';
}

export interface NumberField extends BaseField {
  type: 'number';
}

export interface EmailField extends BaseField {
  type: 'email';
}

export interface TelField extends BaseField {
  type: 'tel';
}

export interface MultilineTextField extends BaseField {
  type: 'multiline-text';
}

export interface SelectField extends BaseField {
  type: 'select';
  options: Option[];
}

export interface RadioField extends BaseField {
  type: 'radio';
  options: Option[];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export interface CheckboxGroupField extends BaseField {
  type: 'checkbox-group';
  options: Option[];
}

export interface SwitchField extends BaseField {
  type: 'switch';
}

export interface DateField extends BaseField {
  type: 'date';
}

export interface TimeField extends BaseField {
  type: 'time';
}

export interface FileField extends BaseField {
  type: 'file';
}

export interface PasswordField extends BaseField {
  type: 'password';
}

export type Field =
  | TextField
  | NumberField
  | EmailField
  | TelField
  | PasswordField
  | MultilineTextField
  | SelectField
  | RadioField
  | CheckboxField
  | CheckboxGroupField
  | SwitchField
  | DateField
  | TimeField
  | FileField;

// --- 5. Group Types ---
export interface GridColumns {
  xs: number;
  md: number;
}

export interface GroupUIConfig {
  // Layout properties
  totalColumns?: number; // Total columns in the group (default: 12)
  spacing?: number; // Spacing between grid items (default: 2)

  // Existing properties
  border?: boolean;
  borderRadius?: string | number;
  padding?: string;
  marginBottom?: string | number;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleComponent?: string;

  // Legacy grid columns (deprecated, use totalColumns instead)
  gridColumns?: GridBreakpoints;
}
export interface FieldUIConfig {
  // Grid layout properties
  colSpan?: GridBreakpoints; // Column span for each breakpoint

  // Material-UI field properties
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  margin?: 'none' | 'dense' | 'normal';
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | undefined;

  // Multiline text specific
  rows?: number;
  maxRows?: number;
  minRows?: number;

  // Radio/Checkbox specific
  row?: boolean;

  // Additional styling
  sx?: SxProps<Theme>;

  // Custom CSS class
  className?: string;
}

export interface GridBreakpoints {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface Group {
  name: string;
  label: string;
  conditions?: Condition[];
  ui: GroupUIConfig;
}

// --- 6. Main Form Schema Type ---
export interface FormSchema {
  id: string;
  title: string;
  description: string;
  ui: UISettings;
  groups: Group[];
  fields: Field[];
}

// --- 7. Component Props Types ---
export interface BaseInputProps {
  field: Field;
}

export interface TextInputProps {
  field: Field;
}

export interface EmailInputProps {
  field: Field;
}

export interface CheckBoxInputProps {
  field: Field;
}

export interface FileUploadInputProps {
  field: Field;
}

export interface CheckBoxGroupInputProps {
  field: Field;
  options: Option[];
}

export interface SelectInputProps {
  field: Field;
  options?: Option[];
}

export interface RadioInputProps {
  field: Field;
  options?: Option[];
}

export interface PasswordInputField {
  field: Field;
  options?: Option[];
}

export interface CheckboxGroupField {
  field: Field;
}

export interface SwitchInputField {
  field: Field;
}

export interface PasswordInputField {
  field: Field;
}

export interface DateInputField {
  field: Field;
}

export interface FieldRendererProps {
  field: Field;
}

export interface ConditionalFormBuilderProps {
  schema: FormSchema;
  formMethods: UseFormReturn<FormData>;
  onSubmit?: (data: FormData) => void;
  defaultValues?: FormData;
}

// --- 8. Condition Evaluation Types ---
export interface ConditionEvaluationResult {
  isVisible: boolean;
  isReadOnly: boolean;
}

// --- 9. Form Data Types ---
export type FormData = Record<string, unknown>;

// --- 10. Utility Types ---
export type FieldByType<T extends FieldType> = Extract<Field, { type: T }>;

export type FieldValue<T extends Field> = T extends CheckboxField
  ? boolean
  : T extends NumberField
  ? number
  : T extends SelectField | RadioField
  ? string | number
  : string;
