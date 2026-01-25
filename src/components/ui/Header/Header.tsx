import { Box, Flex } from '@mantine/core';

export const Header = () => {
  return (
    // Box oder Header als Wrapper mit voller Breite
    <Box>
      <Flex
        justify="space-between"
        align="center"
        w="100%"
      >
        <p>LOGO</p>
        <p>LOGOUT</p>
      </Flex>
    </Box>
  );
};
