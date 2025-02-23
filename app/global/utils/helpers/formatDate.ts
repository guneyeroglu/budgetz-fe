interface IFormatDateOptions {
  hideYear?: boolean;
}

export const formatDate = (dateString: string, options?: IFormatDateOptions): string => {
  if (!dateString) return '-';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return '-';

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    ...(!options?.hideYear && { year: 'numeric' }),
  });

  return formatter.format(date);
};
