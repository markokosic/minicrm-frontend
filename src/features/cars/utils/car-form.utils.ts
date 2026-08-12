import { UpdateCarMutationBody } from '@/api/generated/endpoints/cars/cars';
import { CarResponse } from '@/api/generated/model';

export const getCarUpdateFormDefaultValues = (car: CarResponse): UpdateCarMutationBody => ({
  brand: car.brand || '',
  model: car.model || '',
  licensePlate: car.licensePlate || '',
  horsepower: car.horsepower || '',
});
