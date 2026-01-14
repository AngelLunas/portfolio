import { getThemeColor } from '@utils/helpers';
import React from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

export const ButtonComponent: React.FC<ButtonProps> = ({ label, variant = 'primary' }) => {
  const color = getThemeColor(variant);

  return (
    <button style={{ backgroundColor: color }}>
      {label}
    </button>
  );
};

export default ButtonComponent;
