/**
 *
 * @param date input date string
 * @returns formatted date string in the format of YYYY-MM-DD
 */
export function formatDateString(date: Date) {
  const monthVal = date.getMonth();
  const dayVal = date.getDate();
  const year = date.getFullYear();
  const month = monthVal + 1 < 10 ? `0${monthVal + 1}` : monthVal + 1;
  const day = dayVal < 10 ? `0${dayVal}` : dayVal;
  return `${year}-${month}-${day}`;
}
