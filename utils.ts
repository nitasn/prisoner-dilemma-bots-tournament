///////////////////////////////////////////////////////////////
///                        U T I L S                        ///
///////////////////////////////////////////////////////////////

export const range = (n: number) => [...Array(n).keys()];

export const sum = (arr: number[]) => arr.reduce((sum, x) => sum + x);