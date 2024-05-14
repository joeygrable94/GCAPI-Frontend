export function getNextHighestPageInterval(array: number[], num: number): number {
  let nextHighest = array[array.length - 1];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > num) {
      nextHighest = array[i];
      break;
    }
  }
  return nextHighest;
}
