/**
 *
 * @param date input date string
 * @returns formatted date string in the format of YYYY-MM-DD
 */
export function formatDateString(date: Date) {
  let monthVal = date.getMonth();
  let dayVal = date.getDate();
  let year = date.getFullYear();
  let month = monthVal + 1 < 10 ? `0${monthVal + 1}` : monthVal + 1;
  let day = dayVal < 10 ? `0${dayVal}` : dayVal;
  return `${year}-${month}-${day}`;
}
