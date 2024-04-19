///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { Move, CandidateFunc } from "./types";


export const titForTat: CandidateFunc = (myMoves: Move[], theirMoves: Move[]) => {
  return theirMoves[theirMoves.length - 1] ?? 'cooperate';
}

export const screwYou: CandidateFunc = (myMoves: Move[], theirMoves: Move[]) => {
  return 'defect';
}

export const niceGuy: CandidateFunc = (myMoves: Move[], theirMoves: Move[]) => {
  return 'cooperate';
}

export const random: CandidateFunc = (myMoves: Move[], theirMoves: Move[]) => {
  return Math.random() < 0.5 ? 'cooperate' : 'defect';
}

export const ozStrategy: CandidateFunc = (myMoves: Move[], theirMoves: Move[]) => {
  /**
   * cooperate for 2 moves, defect for 3
   */
  const index = myMoves.length % 5;
  return index <= 2 ? 'cooperate' : 'defect';
}