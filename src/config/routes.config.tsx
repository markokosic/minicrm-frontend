import { AppRouteInterface } from '@/common/types/common-types';
import { carRoutes } from '@/features/cars/routes';
import { dashboardRoutes } from '@/features/dashboard/routes';
import { driverRoutes } from '@/features/drivers/routes';
import { flatrateRoutes } from '@/features/flatrates/routes';
import { reportRoutes } from '@/features/reports/routes';
import { settingsRoutes } from '@/features/settings/routes';
import { shiftRoutes } from '@/features/shifts/routes';
import { userRoutes } from '@/features/users/routes';

export const APP_ROUTES: AppRouteInterface[] = [
  // --- DASHBOARD (MODUL) ---
  ...dashboardRoutes,

  // --- SCHICHTEN (MODUL) ---
  ...shiftRoutes,

  // --- FUHRPARK / FAHRZEUGE (MODUL) ---
  ...carRoutes,

  // --- FAHRER-VERWALTUNG (MODUL) ---
  ...driverRoutes,

  // --- PAUSCHALEN / FLATRATES (MODUL) ---
  ...flatrateRoutes,

  // --- BERICHTE (MODUL) ---
  ...reportRoutes,

  // --- BENUTZERVERWALTUNG (MODUL) ---
  ...userRoutes,

  // --- EINSTELLUNGEN (MODUL - Für alle Rollen offen) ---
  ...settingsRoutes,
];
