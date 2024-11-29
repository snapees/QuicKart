export const formatISOToCustom = (isoStrting: string) => {
  const date = new Date(isoStrting);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const day = date.getUTCDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds}  ${day} ${month} ${year}`;
};
