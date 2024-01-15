/**
 * @summary Returns the file extension of a given filename.
 *
 * @param filename string - the filename to get the extension of
 * @returns string - the file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
};
