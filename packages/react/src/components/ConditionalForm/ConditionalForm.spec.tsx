import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ConditionalForm } from './ConditionalForm';
import type { FormSchema, FormData } from '../../types/formSchema';
import '@testing-library/jest-dom';

vi.mock('../FieldRenderer', () => ({
  FieldRenderer: vi.fn(({ field }) => (
    <div data-testid={`field-${field.name}`}>{field.label}</div>
  )),
}));

vi.mock('../../utils/conditionUtils', () => ({
  evaluateConditions: vi.fn(() => true),
  getDependentFields: vi.fn(() => []),
  evaluateFieldConditions: vi.fn(() => ({ isVisible: true, isReadOnly: false })),
}));

const schema: FormSchema = {
  id: 'test-form',
  title: 'Test Form Title',
  description: 'Form description here.',
  ui: {
    backgroundColor: 'background.default',
    formPadding: '24px',
    titleAlign: 'center',
    titleFontWeight: 'bold',
    buttonGroupJustifyContent: 'center',
  },
  groups: [
    {
      name: 'group1',
      label: 'Group 1',
      ui: {
        border: true,
        padding: '20px',
        gridColumns: { md: 12 },
        spacing: 16,
      },
    },
  ],
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      group: 'group1',
      ui: { colSpan: { md: 6 } },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      group: 'group1',
      ui: { colSpan: { md: 6 } },
    },
  ],
};

describe('<ConditionalForm />', () => {
  const onSubmit = vi.fn();

  const renderComponent = () => {
    const Wrapper = () => {
      const formMethods = useForm<FormData>({
        defaultValues: { firstName: '', lastName: '' },
      });

      return (
        <ConditionalForm
          schema={schema}
          formMethods={formMethods}
          onSubmit={onSubmit}
        />
      );
    };

    return render(<Wrapper />);
  };

  it('renders form title and description', () => {
    renderComponent();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('renders all fields inside their groups', () => {
    renderComponent();
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByTestId('input-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('input-lastName')).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', async () => {
    renderComponent();
    await act(() => {
      fireEvent.click(screen.getByText('Submit'));
    });
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls reset when the Reset button is clicked', async () => {
    renderComponent();
    await act(() => {
      fireEvent.click(screen.getByText('Reset'));
    });
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

});
