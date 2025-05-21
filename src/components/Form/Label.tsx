type LabelProps = {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children }: LabelProps) => {
  return <label>{children}</label>;
};

export { Label };
