import React from 'react';

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const FormButton: React.FC<FormButtonProps> = ({ label, ...props }) => {
  return <button {...props}>{label} test bbbb dsds</button>;
};
