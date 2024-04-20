///////////////////////////////////////////////////////////////
///                        U T I L S                        ///
///////////////////////////////////////////////////////////////

export const sum = (arr: number[]) => arr.reduce((sum, x) => sum + x);

/**
 * Python's range() function.
 */
export const range = (n: number, m?: number) => {
  if (m === undefined) {
    return [...Array(n).keys()];
  }
  return [...Array(m - n).keys()].map((x) => x + n);
};

export const lastOf = <T>(arr: T[]) => arr[arr.length - 1];
