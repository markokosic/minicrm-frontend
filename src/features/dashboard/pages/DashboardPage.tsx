import { Calendar, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Stack, Tabs } from '@mantine/core';
import { useUrlFilters } from '@/common/hooks/useUrlFilters';
import { PageLayout } from '@/components/layout/PageLayout';
import { MonthlyDashboardView } from '../components/MonthlyDashboardView';
import { YearlyDashboardView } from '../components/YearlyDashboardView';

const DashboardPage = () => {
  const { t } = useTranslation(['app', 'common']);
  const { getFilter, setFilter } = useUrlFilters();

  const activeTab = getFilter('tab', 'month');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const handleTabChange = (value: string | null) => {
    if (value) {
      setFilter('tab', value === 'month' ? null : value);
    }
  };

  return (
    <PageLayout
      title={t('common:navigation.dashboard')}
      showBack={false}
    >
      <Stack gap="lg" pb="xl">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="outline"
          radius="md"
        >
          <Tabs.List>
            <Tabs.Tab
              value="month"
              leftSection={<Calendar size={16} />}
            >
              {t('app:dashboard.tabs.month')}
            </Tabs.Tab>
            <Tabs.Tab
              value="year"
              leftSection={<CalendarDays size={16} />}
            >
              {t('app:dashboard.tabs.year')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="month" pt="lg">
            <MonthlyDashboardView year={year} month={month} />
          </Tabs.Panel>

          <Tabs.Panel value="year" pt="lg">
            <YearlyDashboardView year={year} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </PageLayout>
  );
};

export default DashboardPage;
