import { Paper, Skeleton, Stack } from '@mantine/core';

export const RevenuesListSkeleton = () => (
  <Stack gap="md">
    {Array.from({ length: 3 }).map((_, idx) => (
      <Paper
        key={idx}
        p="md"
        withBorder
        radius="md"
      >
        <Skeleton
          height={20}
          width="40%"
          mb="sm"
        />
        <Skeleton
          height={50}
          mb="sm"
        />
        <Skeleton
          height={20}
          width="20%"
        />
      </Paper>
    ))}
  </Stack>
);
