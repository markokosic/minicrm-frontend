import {
  DollarSign,
  File,
  House,
  LucideIcon,
  LucideWorkflow,
  PersonStanding,
  Settings,
} from 'lucide-react';
import { routes } from './routes';

export interface NavItem {
  id: string | number;
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
      href: routes.app.dashboard.getHref(),
      path: routes.app.dashboard.path,
      labelKey: 'navigation.dashboard',
      icon: House,
    },
    {
      id: 1,
      href: routes.app.customers.getHref(),
      path: routes.app.customers.path,
      labelKey: 'navigation.customers',
      icon: PersonStanding,
    },
    {
      id: 2,
      href: routes.app.offers.getHref(),
      path: routes.app.offers.path,
      labelKey: 'navigation.offers',
      icon: File,
    },
    {
      id: 3,
      href: routes.app.orders.getHref(),
      path: routes.app.orders.path,
      labelKey: 'navigation.orders',
      icon: LucideWorkflow,
    },
    {
      id: 4,
      href: routes.app.billing.getHref(),
      path: routes.app.billing.path,
      labelKey: 'navigation.billing',
      icon: DollarSign,
    },
  ],
  support: [
    {
      id: 5,
      href: routes.app.settings.getHref(),
      path: routes.app.settings.path,
      labelKey: 'navigation.settings',
      icon: Settings,
    },
  ],
};
