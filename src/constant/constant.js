export const DATE = Object.freeze({
  eventYear: 2023,
  eventMonth: 12,
  eventDate: (day) => `${DATE.eventYear}-${DATE.eventMonth}-${day}`,
});

export const SEPARATOR = Object.freeze({
  item: ',',
  count: '-',
});
