export const customersKeys = {
  all: ['customers'] as const,
  lists: () => [...customersKeys.all, 'list'] as const,
  list: (filters: { status?: string } = {}) => [...customersKeys.lists(), { filters }] as const,
  detail: (id: number) => [...customersKeys.all, 'detail', id] as const,
};
