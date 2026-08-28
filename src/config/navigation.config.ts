import {
  CalendarDays,
  Car,
  FileChartLine,
  House,
  LucideIcon,
  PersonStanding,
  Settings,
  Tag,
  Users,
} from 'lucide-react';
import { ROUTES } from './routes';

export interface NavItem {
  id: number;
  path: string;
  href: string;
  labelKey: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: Record<string, NavItem[]> = {
  overview: [
    {
      id: 0,
      href: ROUTES.app.dashboard.getHref(),
      path: ROUTES.app.dashboard.path,
      labelKey: 'navigation.dashboard',
      icon: House,
    },
    {
      id: 1,
      href: ROUTES.app.reports.getHref(),
      path: ROUTES.app.reports.path,
      labelKey: 'navigation.reports',
      icon: FileChartLine,
    },
  ],
  operations: [
    {
      id: 2,
      href: ROUTES.app.shifts.getHref(),
      path: ROUTES.app.shifts.path,
      labelKey: 'navigation.shifts',
      icon: CalendarDays,
    },
    {
      id: 3,
      href: ROUTES.app.drivers.getHref(),
      path: ROUTES.app.drivers.path,
      labelKey: 'navigation.drivers',
      icon: PersonStanding,
    },
    {
      id: 4,
      href: ROUTES.app.cars.getHref(),
      path: ROUTES.app.cars.path,
      labelKey: 'navigation.cars',
      icon: Car,
    },
  ],
  administration: [
    {
      id: 5,
      href: ROUTES.app.flatrates.getHref(),
      path: ROUTES.app.flatrates.path,
      labelKey: 'navigation.flatrates',
      icon: Tag,
    },
    {
      id: 6,
      href: ROUTES.app.users.getHref(),
      path: ROUTES.app.users.path,
      labelKey: 'navigation.users',
      icon: Users,
    },
    {
      id: 7,
      href: ROUTES.app.settings.getHref(),
      path: ROUTES.app.settings.path,
      labelKey: 'navigation.settings',
      icon: Settings,
    },
  ],
};
