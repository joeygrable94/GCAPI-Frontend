/**
 * @summary simple glob regex match test
 */
export const globMatch = function (pattern: string, input: string): boolean {
  var re = new RegExp(
    pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, '\\$1').replace(/\*/g, '.*')
  );
  return re.test(input);
};
