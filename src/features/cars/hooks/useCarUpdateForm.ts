import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import {
  getGetAllCarsQueryKey,
  getGetCarQueryKey,
  UpdateCarMutationBody,
  useUpdateCar,
} from '@/api/generated/endpoints/cars/cars';
import { CarResponse } from '@/api/generated/model';
import { UpdateCarBody } from '@/api/generated/zod/cars/cars';
import { getCarUpdateFormDefaultValues } from '../utils/car-form.utils';


export const useCarUpdateForm = (car: CarResponse) => {
  const { t } = useTranslation(['app', 'errors']);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateCar();

  const methods = useForm<UpdateCarMutationBody>({
    resolver: zodResolver(UpdateCarBody),
    shouldUnregister: true,
    mode: 'onChange',
    defaultValues: getCarUpdateFormDefaultValues(car),
  });

  const onSubmit = (data: UpdateCarMutationBody) => {
    mutate(
      { id: car.id!, data },
      {
        onSuccess: () => {
          toast.success(t('app:cars.notifications.update.success'));
          if (car.id) {
            queryClient.invalidateQueries({ queryKey: getGetCarQueryKey(car.id) });
          }
          queryClient.invalidateQueries({ queryKey: getGetAllCarsQueryKey() });
          methods.reset(data);
        },
      }
    );
  };

  return {
    methods,
    onSubmit,
    isPending,
  };
};
