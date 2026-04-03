import { RemunerationConfig } from '@/features/remuneration/remuneration-types';

export type DriverId = number;

export type Driver = {
  id: DriverId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  remunerationConfig: RemunerationConfig;
};

export type CreateDriverRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  remunerationConfig: RemunerationConfig;
};

export type UpdateDriverRequest = Partial<CreateDriverRequest>;
