import { focusStyle } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Link as RouterLink, LinkProps } from 'react-router';

const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn('text-slate-600 hover:text-slate-900 inline-block ', focusStyle, className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export { Link };
