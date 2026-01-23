import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Container, Group, Title } from '@mantine/core';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  backFallback?: number;
  actions?: ReactNode;
}

export const PageLayout = ({
  children,
  title,
  showBack = true,
  backFallback = -1,
  actions,
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const previous = location.state?.from;
    if (previous) {
      navigate(previous);
    } else {
      navigate(backFallback);
    }
  };

  return (
    <div>
      <Group
        justify="space-between"
        align="center"
        mb="md"
        // noWrap
      >
        {/* Linke Seite: Back-Button + Title */}
        <Group
          gap="sm"
          align="center"
        >
          {showBack && (
            <Button
              size="sm"
              variant="outline"
              onClick={goBack}
            >
              Zurück
            </Button>
          )}
          <Title order={1}>{title}</Title>
        </Group>

        {/* Rechte Seite: Actions */}
        <Group
          gap="sm"
          align="center"
        >
          {actions}
        </Group>
      </Group>

      {children}
    </div>
  );
};
