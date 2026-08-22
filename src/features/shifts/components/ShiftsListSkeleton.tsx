import { Skeleton, Stack } from '@mantine/core';

interface ShiftsListSkeletonProps {
  count?: number;
}

export const ShiftsListSkeleton = ({ count = 5 }: ShiftsListSkeletonProps) => {
  return (
    <Stack gap="md">
      {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
        <Skeleton key={i} height={50} radius="md" />
      ))}
    </Stack>
  );
};
