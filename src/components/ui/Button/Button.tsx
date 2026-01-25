import { Button as $Button, ButtonProps as $ButtonProps, ElementProps } from '@mantine/core';

interface ButtonProps extends $ButtonProps, ElementProps<'button', keyof $ButtonProps> {}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <$Button
      variant="filled"
      size="md"
      radius="xl"
      {...props}
    >
      {children}
    </$Button>
  );
};
