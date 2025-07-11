import React from 'react';

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const FormButton: React.FC<FormButtonProps> = ({ label, ...props }) => {
<<<<<<< HEAD
  return <button {...props}>{label} </button>;
=======
  return <button {...props}>{label} ttsadsd</button>;

>>>>>>> 995bdf8ae457b172a90de1604f2c8f289d4b23f7
};
