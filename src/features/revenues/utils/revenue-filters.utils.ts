export interface ParsedRevenueFilters {
  driverId: number | undefined;
  dateFrom: string | undefined;
  dateTo: string | undefined;
}

export const parseRevenueFilters = (
  getFilter: (key: string) => string | null
): ParsedRevenueFilters => {
  const driverIdStr = getFilter('driverId');
  const driverId = driverIdStr ? Number(driverIdStr) : undefined;
  const dateFrom = getFilter('dateFrom') || undefined;
  const dateTo = getFilter('dateTo') || undefined;

  return {
    driverId,
    dateFrom,
    dateTo,
  };
};
