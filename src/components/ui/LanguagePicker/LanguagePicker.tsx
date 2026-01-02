import { useState } from 'react';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import classes from './LanguagePicker.module.css';
import { ChevronDown } from 'lucide-react';
import i18n from '@/lib/i18n';

const data = [
  { label: 'English', image: 'img' },
  { label: 'German', image: 'img' },
  { label: 'Italian', image: 'img' },
  { label: 'French', image: 'img' },
  { label: 'Polish', image: 'img' },
];

export const LanguagePicker = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.resolvedLanguage);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);

  function changeLanguage(lng: string) {
    if (lng === currentLanguage) {
      return;
    }
    i18n.changeLanguage(lng).then(() => setCurrentLanguage(lng));
  }

  const items = data.map((item) => (
    <Menu.Item
      leftSection={
        <p>left</p>

        // <Image
        //   src={item.image}
        //   width={18}
        //   height={18}
        // />
      }
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            {/* <Image
              src={selected.image}
              w={22}
              h={22}
            /> */}
            <span className="">{selected.label}</span>
          </Group>
          <ChevronDown
            size={16}
            className={classes.icon}
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
