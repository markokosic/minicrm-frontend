import { DollarSign, File, House, LogOut, LucideWorkflow, PersonStanding } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { routes } from '@/config/routes';
import { useLogout } from '@/lib/auth';

const data = [
  { id: 0, link: routes.app.dashboard.getHref(), labelKey: 'dashboard', icon: <House /> },
  { id: 1, link: routes.app.customers.getHref(), labelKey: 'customers', icon: <PersonStanding /> },
  { id: 2, link: routes.app.offers.getHref(), labelKey: 'offers', icon: <File /> },
  { id: 3, link: routes.app.orders.getHref(), labelKey: 'orders', icon: <LucideWorkflow /> },
  { id: 4, link: routes.app.billing.getHref(), labelKey: 'billing', icon: <DollarSign /> },
];

type NavbarProps = {
  toggle: () => void;
};

const Navbar = ({ toggle }: NavbarProps) => {
  const location = useLocation();
  const { t } = useTranslation('common');

  const navigate = useNavigate();
  const logoutMutation = useLogout({
    onSuccess: () => {
      navigate(routes.auth.login.path);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : t('loginError') || 'Logout fehlgeschlagen';
      toast.error(errorMessage);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined);
  };

  const links = data.map((item) => (
    <a
      className={`${
        item.link === location.pathname ? 'bg-blue-300' : ''
      } rounded-md flex  items-center justify-start gap-2 p-2 hover:bg-blue-100 cursor-pointer`}
      key={item.labelKey}
      onClick={(event) => {
        event.preventDefault();
        navigate(item.link);
        toggle();
      }}
    >
      {item.icon}
      <span>{t(item.labelKey)}</span>
    </a>
  ));

  return (
    <nav className={'flex h-full flex-col  justify-between items-between'}>
      <div className={''}>{links}</div>
      <div className="h-[200px] bg-blue-300 rounded-md">CTA</div>

      <div
        onClick={handleLogout}
        className={' border-t pt-4 border-t-gray-200'}
      >
        <button
          className={
            'flex gap-2 items-center justify-center bg-gray-200 rounded-md p-2 hover:bg-gray-300 cursor-pointer'
          }
          onClick={(event) => event.preventDefault()}
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
