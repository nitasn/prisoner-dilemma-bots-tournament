///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { CandidateFunc, Move } from "./types";
import { lastOf } from "./utils";


export const titForTat: CandidateFunc = (myMoves, theirMoves) => {
  return lastOf(theirMoves) ?? Move.Coöperate;
}

export const cassandraBot: CandidateFunc = (myMoves, theirMoves) => {
  /**
   * start mean.
   * after they defect, you become nice for 3 rounds.
   */
  const isGuilty = theirMoves.slice(theirMoves.length - 3).includes(Move.Defect);
  return isGuilty ? Move.Coöperate : Move.Defect;
}

export const screwYou: CandidateFunc = (myMoves, theirMoves) => {
  return Move.Defect;
}

export const niceGuy: CandidateFunc = (myMoves, theirMoves) => {
  return Move.Coöperate;
}

export const random: CandidateFunc = (myMoves, theirMoves) => {
  return Math.random() < 0.5 ? Move.Coöperate : Move.Defect;
}

export const nice2every5: CandidateFunc = (myMoves, theirMoves) => {
  /**
   * cooperate for 2 moves, defect for 3
   */
  return (myMoves.length % 5) <= 2 ? Move.Coöperate : Move.Defect;
}

export const ozStrategy: CandidateFunc = (myMoves, theirMoves) => {
  let theirDefectsCount = 0;
  theirMoves.forEach((theirMove) => {
    if (theirMove == Move.Defect) {
      theirDefectsCount++;
    }
  })
  return theirDefectsCount <= 3 ? Move.Coöperate : Move.Defect;
}