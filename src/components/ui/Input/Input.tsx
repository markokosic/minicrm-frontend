import React from 'react';
import { cn } from '@/lib/utils';
import { focusStyle } from '@/lib/styles';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

const Input = ({ ref, className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input px-3 py-2 bg-base-100  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground    disabled:cursor-not-allowed disabled:opacity-50 ',
        focusStyle,
        className
      )}
      {...props}
    />
  );
};

export { Input };
