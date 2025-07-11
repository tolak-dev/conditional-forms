import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return <button data-testid={`input-button-${label}`}
 {...props}>{label} TEST sadasd</button>;
};
