///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { CandidateFunc } from "./types";


export const titForTat: CandidateFunc = (myMoves, theirMoves) => {
  return theirMoves[theirMoves.length - 1] ?? 'cooperate';
}

export const cassandraBot: CandidateFunc = (myMoves, theirMoves) => {
  /**
   * start mean.
   * if they defect, you become nice for 3 rounds.
   */
  const isGuilty = theirMoves.slice(theirMoves.length - 3).includes("defect");
  return isGuilty ? "cooperate" : "defect";
}

export const screwYou: CandidateFunc = (myMoves, theirMoves) => {
  return 'defect';
}

export const niceGuy: CandidateFunc = (myMoves, theirMoves) => {
  return 'cooperate';
}

export const random: CandidateFunc = (myMoves, theirMoves) => {
  return Math.random() < 0.5 ? 'cooperate' : 'defect';
}

export const every2of5: CandidateFunc = (myMoves, theirMoves) => {
  /**
   * cooperate for 2 moves, defect for 3
   */
  return (myMoves.length % 5) <= 2 ? 'cooperate' : 'defect';
}

export const ozStrategy: CandidateFunc = (myMoves, theirMoves) => {
  let theirDefectsCount = 0;
  theirMoves.forEach((theirMove) => {
    if (theirMove == 'defect') {
      theirDefectsCount++;
    }
  })
  return theirDefectsCount <= 3 ? 'cooperate' : 'defect';
}