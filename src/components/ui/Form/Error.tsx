type ErrorProps = {
  errorMessage?: string | null;
};

const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-sm mt-1 ml-1 font-semibold text-red-500"
    >
      {errorMessage}
    </div>
  );
};

export { Error };
