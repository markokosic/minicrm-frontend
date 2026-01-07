import { Spinner } from '@/components/ui/Spinner';
import { focusStyle } from '@/lib/styles';
import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

type ButtonVariant = 'default' | 'ghost' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

const buttonStyling = tv({
  base: 'cursor-pointer rounded-md font-medium  whitespace-nowrap flex items-center justify-center',
  variants: {
    variant: {
      default: 'bg-primary text-white shadow hover:bg-primary/90',
      ghost: 'bg-transparent hover:bg-muted',
      secondary: 'bg-secondary text-white',
    },
    size: {
      sm: 'h-8 px-3',
      md: 'h-10 px-4',
      lg: 'h-12 px-6',
      icon: 'size-9',
    },
    disabled: {
      true: 'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-none',
    },
  },
});

const Button = ({
  children,
  ref,
  icon,
  variant = 'default',
  size = 'md',
  disabled,
  isLoading,
  className,
}: ButtonProps) => {
  const style = cn(buttonStyling({ size, variant, disabled }), focusStyle, className);

  return (
    <button
      ref={ref}
      className={style}
    >
      {isLoading && (
        <Spinner
          size="sm"
          className="text-current"
        />
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}

      <span className="mx-2">{children}</span>
    </button>
  );
};

export { Button };
