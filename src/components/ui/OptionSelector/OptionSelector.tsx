import { Stack, Tabs, Text } from '@mantine/core';

type Option = {
  label: string;
  value: string | number;
};

type OptionSelectorProps = {
  options: Option[];
  title: string;
  subtitle: string;
  selectedOption: string | number | null;
  onChange: (value: string | number) => void;
};

export const OptionSelector = ({
  options,
  title,
  subtitle,
  selectedOption,
  onChange,
}: OptionSelectorProps) => {
  return (
    <Stack
      align="center"
      gap="md"
    >
      <Stack
        align="center"
        gap={2}
      >
        <Text
          fw={500}
          size="lg"
        >
          {title}
        </Text>
        <Text
          c="dimmed"
          size="sm"
        >
          {subtitle}
        </Text>
      </Stack>

      <Tabs
        value={selectedOption?.toString() || options[0]?.value.toString()}
        onChange={(value) => onChange(value)}
        variant="pills"
        radius="lg"
        keepMounted={false} // optional, falls du die Panels nicht immer rendern willst
      >
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Tab
              key={option.value}
              value={option.value.toString()}
            >
              {option.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Stack>
  );
};
