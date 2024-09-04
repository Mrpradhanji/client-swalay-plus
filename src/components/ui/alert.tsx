// src/components/ui/alert.tsx

import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', className, children }) => {
  const baseClasses = 'p-4 rounded-md shadow-sm';
  const variantClasses = variant === 'destructive'
    ? 'bg-red-100 text-red-800 border-red-300'
    : 'bg-green-100 text-green-800 border-green-300';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span>{children}</span>
);
