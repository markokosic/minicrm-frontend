export const customersKeys = {
  all: ['customers'] as const, // Basis-Key für alle Kunden-Daten
  lists: () => [...customersKeys.all, 'list'] as const, // Key für Kundenliste
  list: (filters: { status?: string } = {}) => [...customersKeys.lists(), { filters }] as const, // Key für gefilterte Kundenliste, z.B. nur aktive Kunden
  detail: (id: number) => [...customersKeys.all, 'detail', id] as const, // Key für Kundendetails einer bestimmten ID
};
