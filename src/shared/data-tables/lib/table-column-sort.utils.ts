/**
 * @summary Table column sorting function for URLs.
 *
 * @param rowA The row A.
 * @param rowB The row B.
 * @param columnId The column ID.
 * @returns number -1 or 1
 */
export function columnSortByUrl(rowA: any, rowB: any, columnId: any): number {
  const urlA = rowA.original[columnId];
  const urlB = rowB.original[columnId];

  const AurlParts = urlA.split('/');
  const BurlParts = urlB.split('/');

  // Compare URL parts
  for (let i = 0; i < AurlParts.length; i++) {
    if (AurlParts[i] !== BurlParts[i]) {
      return AurlParts[i].localeCompare(BurlParts[i]);
    }
  }

  // Compare URL lengths
  if (urlA.length !== urlB.length) {
    return urlA.length - urlB.length;
  }

  // If lengths are equal, compare alphabetically
  return urlA.localeCompare(urlB);
}
