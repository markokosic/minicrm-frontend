type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-base-100 px-4">
      <title>{title}</title>
      {children}
    </div>
  );
};

export { AuthLayout };
