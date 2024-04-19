///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { Action, CandidateFunc } from "./types";


export const secret: CandidateFunc = (myActs: Action[], theirActs: Action[]) => {
  myActs[0];
  return theirActs[theirActs.length - 1] ?? 'cooperate';
}

export const selfish: CandidateFunc = (myActs: Action[], theirActs: Action[]) => {
  return 'defect';
}

export const niceGuy: CandidateFunc = (myActs: Action[], theirActs: Action[]) => {
  return 'cooperate';
}

export const random: CandidateFunc = (myActs: Action[], theirActs: Action[]) => {
  return Math.random() < 0.5 ? 'cooperate' : 'defect';
}
