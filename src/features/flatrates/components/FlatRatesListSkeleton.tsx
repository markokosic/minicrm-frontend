import { Skeleton, Stack } from '@mantine/core';

interface FlatRatesListSkeletonProps {
  count?: number;
}

export const FlatRatesListSkeleton = ({ count = 3 }: FlatRatesListSkeletonProps) => {
  return (
    <Stack gap="md">
      {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
        <Skeleton key={i} height={60} radius="md" />
      ))}
    </Stack>
  );
};
