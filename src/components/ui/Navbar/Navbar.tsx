import { DollarSign, File, House, LogOut, LucideWorkflow, PersonStanding } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { paths } from '@/config/paths';
import { useTranslation } from 'react-i18next';

const data = [
  { id: 0, link: paths.app.dashboard.getHref(), labelKey: 'dashboard', icon: <House /> },
  { id: 1, link: paths.app.customers.getHref(), labelKey: 'customers', icon: <PersonStanding /> },
  { id: 2, link: paths.app.offers.getHref(), labelKey: 'offers', icon: <File /> },
  { id: 3, link: paths.app.orders.getHref(), labelKey: 'orders', icon: <LucideWorkflow /> },
  { id: 4, link: paths.app.billing.getHref(), labelKey: 'billing', icon: <DollarSign /> },
];

type NavbarProps = {
  toggle: () => void;
};

const Navbar = ({ toggle }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('common');

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

      <div className={' border-t pt-4 border-t-gray-200'}>
        <a
          href="#"
          className={
            'flex gap-2 items-center justify-center bg-gray-200 rounded-md p-2 hover:bg-gray-300 cursor-pointer'
          }
          onClick={(event) => event.preventDefault()}
        >
          <LogOut />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
