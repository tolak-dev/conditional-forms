import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from './TextInput';
import '@testing-library/jest-dom';
import { Field } from '../../../types/formSchema';
import * as useConditionalFieldStateModule from '../../../hooks/useConditionalFieldState';
import { useEffect } from 'react';

vi.mock('../../../hooks/useConditionalFieldState', () => ({
  useConditionalFieldState: vi.fn(() => ({ isVisible: true, isReadOnly: false })),
}));

const baseField: Field = {
  name: 'firstName',
  label: 'First Name',
  type: 'text',
  group: 'personal',
  ui: { colSpan: { md: 6 } },
};

const renderWithProvider = (
  field: Field,
  mockState = { isVisible: true, isReadOnly: false }
) => {
  vi.mocked(useConditionalFieldStateModule.useConditionalFieldState).mockReturnValue(mockState);

  const Wrapper = () => {
    const methods = useForm({ defaultValues: { [field.name]: '' } });
    return (
      <FormProvider {...methods}>
        <TextInput field={field} />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
};

describe('<TextInput />', () => {
  it('renders input with label', () => {
    renderWithProvider(baseField);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByTestId('input-firstName')).toBeInTheDocument();
  });

  it('does not render if isVisible = false', () => {
    renderWithProvider(baseField, { isVisible: false, isReadOnly: false });
    expect(screen.queryByLabelText('First Name')).not.toBeInTheDocument();
  });

  it('renders with readOnly when isReadOnly = true', () => {
    renderWithProvider(baseField, { isVisible: true, isReadOnly: true });
    const input = screen.getByTestId('input-firstName');
    expect(input).toBeDisabled();
    expect(input).toHaveProperty('readOnly', true);
  });

  it('displays error message when field has error', () => {
    const WrapperWithError = () => {
      const methods = useForm({
        defaultValues: { firstName: '' },
        mode: 'onSubmit',
      });

      useEffect(() => {
        methods.setError('firstName', { type: 'manual', message: 'Required field' });
      }, []);

      return (
        <FormProvider {...methods}>
          <TextInput field={baseField} />
        </FormProvider>
      );
    };

    render(<WrapperWithError />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });
});
