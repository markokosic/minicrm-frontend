import {
  DollarSign,
  File,
  House,
  LucideIcon,
  LucideWorkflow,
  PersonStanding,
  Settings,
} from 'lucide-react';
import { ROUTES } from './routes';

export interface NavItem {
  id: number;
  path: string;
  href: string;
  labelKey: string;
  icon: LucideIcon;
  roles?: string[];
}

export const NAV_ITEMS: Record<string, NavItem[]> = {
  general: [
    {
      id: 0,
      href: ROUTES.app.dashboard.getHref(),
      path: ROUTES.app.dashboard.path,
      labelKey: 'navigation.dashboard',
      icon: House,
    },
    {
      id: 1,
      href: ROUTES.app.customers.getHref(),
      path: ROUTES.app.customers.path,
      labelKey: 'navigation.customers',
      icon: PersonStanding,
    },
    {
      id: 2,
      href: ROUTES.app.offers.getHref(),
      path: ROUTES.app.offers.path,
      labelKey: 'navigation.offers',
      icon: File,
    },
    {
      id: 3,
      href: ROUTES.app.orders.getHref(),
      path: ROUTES.app.orders.path,
      labelKey: 'navigation.orders',
      icon: LucideWorkflow,
    },
    {
      id: 4,
      href: ROUTES.app.billing.getHref(),
      path: ROUTES.app.billing.path,
      labelKey: 'navigation.billing',
      icon: DollarSign,
    },
  ],
  support: [
    {
      id: 5,
      href: ROUTES.app.settings.getHref(),
      path: ROUTES.app.settings.path,
      labelKey: 'navigation.settings',
      icon: Settings,
    },
  ],
};
