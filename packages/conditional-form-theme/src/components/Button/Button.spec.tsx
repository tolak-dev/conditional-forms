import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

import { Button } from './Button';

describe('<Button />', () => {
  it('renders with the correct label', () => {
    render(<Button label="Submit" />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button label="Click me" className="my-custom-button" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('my-custom-button');
  });

  it('includes correct data-testid attribute', () => {
    render(<Button label="Test" />);
    const button = screen.getByTestId('input-button-Test');
    expect(button).toBeInTheDocument();
  });

});
