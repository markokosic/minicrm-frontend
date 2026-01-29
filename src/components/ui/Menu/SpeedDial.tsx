import { useState } from 'react';
import { LucideIcon, X } from 'lucide-react';
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Flex,
  Group,
  Overlay,
  RemoveScroll,
  Stack,
  Text,
  Transition,
} from '@mantine/core';

type SpeedDialProps = {
  Icon: LucideIcon;
  actions: SpeedDialAction[];
};

type SpeedDialAction = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
};

export const SpeedDial = ({ Icon, actions }: SpeedDialProps) => {
  const [openDial, setOpenDial] = useState<boolean>(false);
  return (
    <Group>
      {openDial && (
        <RemoveScroll>
          <Overlay
            onClick={() => setOpenDial(false)}
            color="#000"
            backgroundOpacity={0.65}
          />
        </RemoveScroll>
      )}

      <Affix
        position={{ bottom: 94, right: 24 }}
        zIndex={9999}
      >
        <Transition
          mounted={openDial}
          transition="slide-left"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Stack
              style={{ ...styles }}
              gap="xs"
            >
              {actions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="transparent"
                  p={0}
                  mih={48}
                  onClick={() => {
                    action.onClick();
                    setOpenDial(false);
                  }}
                  styles={{
                    root: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    },
                  }}
                >
                  <Flex
                    justify="flex-end"
                    align="center"
                    gap="xs"
                  >
                    <Box
                      bdrs="md"
                      bg="white"
                      px={12}
                      py={6}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Text
                        c="black"
                        fw={500}
                        styles={{
                          root: { whiteSpace: 'nowrap', lineHeight: 1 },
                        }}
                      >
                        {action.label}
                      </Text>
                    </Box>

                    <ActionIcon
                      component="div"
                      tabIndex={-1}
                      variant="white"
                      size="xl"
                      radius="xl"
                    >
                      <action.icon />
                    </ActionIcon>
                  </Flex>
                </Button>
              ))}
            </Stack>
          )}
        </Transition>
      </Affix>

      <Affix
        position={{ bottom: 24, right: 24 }}
        zIndex={9999}
      >
        <ActionIcon
          size="xl"
          radius="xl"
          variant={`${openDial ? 'white' : 'filled'}`}
          onClick={() => setOpenDial(!openDial)}
        >
          {!openDial && <Icon size={24} />}
          {openDial && (
            <X
              size={24}
              style={{ color: 'var(--mantine-color-primary)' }}
            />
          )}
        </ActionIcon>
      </Affix>
    </Group>
  );
};
