import logo from '@/assets/logo.svg';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <>
      <img
        className={className}
        src={logo}
        alt="Logo"
        decoding="async"
      />
    </>
  );
};

export { Logo };
