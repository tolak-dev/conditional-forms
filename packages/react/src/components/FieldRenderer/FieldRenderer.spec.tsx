import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import type { Field } from "../../types/formSchema";

import "@testing-library/jest-dom";

vi.mock("../fields", () => ({
  TextInput: vi.fn(({ field }) => <div data-testid="TextInput">{field.label}</div>),
  NumberInput: vi.fn(({ field }) => <div data-testid="NumberInput">{field.label}</div>),
  SelectInput: vi.fn(({ field }) => <div data-testid="SelectInput">{field.label}</div>),
  MultilineTextInput: vi.fn(({ field }) => <div data-testid="MultilineTextInput">{field.label}</div>),
  RadioInput: vi.fn(({ field }) => <div data-testid="RadioInput">{field.label}</div>),
}));

vi.mock("../fields/CheckBox/CheckBox", () => ({
  CheckboxInput: vi.fn(({ field }) => <div data-testid="CheckboxInput">{field.label}</div>),
}));

const baseField: Partial<Field> = {
  name: "testField",
  label: "Test Label",
  group: "testGroup",
  ui: { colSpan: { md: 6 } },
};

const renderWithFormProvider = (field: Field) => {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <FieldRenderer field={field} />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe("<FieldRenderer />", () => {
  it("renders TextInput for type='text'", () => {
    renderWithFormProvider({ ...baseField, type: "text" } as Field);
    expect(screen.getByTestId("TextInput")).toBeInTheDocument();
  });

  it("renders NumberInput for type='number'", () => {
    renderWithFormProvider({ ...baseField, type: "number" } as Field);
    expect(screen.getByTestId("NumberInput")).toBeInTheDocument();
  });

  it("renders MultilineTextInput for type='multiline-text'", () => {
    renderWithFormProvider({ ...baseField, type: "multiline-text" } as Field);
    expect(screen.getByTestId("MultilineTextInput")).toBeInTheDocument();
  });

  it("renders SelectInput for type='select'", () => {
    renderWithFormProvider({
      ...baseField,
      type: "select",
      options: [{ label: "A", value: "a" }],
    } as Field);
    expect(screen.getByTestId("SelectInput")).toBeInTheDocument();
  });

  it("renders RadioInput for type='radio'", () => {
    renderWithFormProvider({
      ...baseField,
      type: "radio",
      options: [{ label: "R1", value: "1" }],
    } as Field);
    expect(screen.getByTestId("RadioInput")).toBeInTheDocument();
  });

  it("renders CheckboxInput for type='checkbox'", () => {
    renderWithFormProvider({
      ...baseField,
      type: "checkbox",
    } as Field);
    expect(screen.getByTestId("CheckboxInput")).toBeInTheDocument();
  });

  it("renders fallback for unsupported type", () => {
    renderWithFormProvider({
      ...baseField,
      type: "unsupported-type",
    } as unknown as Field);
    expect(screen.getByText("Unsupported field type: unsupported-type")).toBeInTheDocument();
  });
});
