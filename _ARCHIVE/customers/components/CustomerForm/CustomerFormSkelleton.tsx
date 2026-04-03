import { Box, Group, Skeleton, Stack } from '@mantine/core';

//TODO ADAPT TO REAL CARD

export const CustomerFormSkeleton = () => {
  return (
    <Stack gap="md">
      {/* Simuliert zwei Felder nebeneinander */}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>{' '}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>{' '}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>{' '}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>{' '}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>
      {/* Simuliert ein breites Feld */}
      <Box>
        <Skeleton
          height={12}
          width="20%"
          mb={8}
          radius="xl"
        />
        <Skeleton
          height={36}
          radius="sm"
        />
      </Box>
    </Stack>
  );
};
