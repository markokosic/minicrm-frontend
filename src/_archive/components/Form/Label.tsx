type LabelProps = {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children }: LabelProps) => {
  return <label className="font-semibold">{children}</label>;
};

export { Label };
