import { type FieldError } from 'react-hook-form';
import { Label } from './Label';
import { Error } from './Error';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => {
  return (
    <div>
      <Label>
        {label}
        <div className="mt-1">{children}</div>
      </Label>
      <Error errorMessage={error?.message} />
    </div>
  );
};

export { FieldWrapper };
