import { Card, Flex, Skeleton, Stack } from '@mantine/core';

export const CarCardSkeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <Flex gap={24} wrap="wrap">
      {skeletons.map((_, index) => (
        <Card
          key={index}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w={{ base: '100%', sm: 320 }}
        >
          <Stack gap="xs">
            <Skeleton
              height={18}
              width="30%"
              mb="xs"
            />
            <Skeleton
              height={22}
              width="60%"
            />
            <Skeleton
              height={14}
              width="50%"
            />
          </Stack>
        </Card>
      ))}
    </Flex>
  );
};
