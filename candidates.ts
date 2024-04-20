import { Strategy } from "./types";
import { lastOf } from "./utils";

///////////////////////////////////////////////////////////////
///                     T H E   B O T S                     ///
///////////////////////////////////////////////////////////////

export const TitForTat: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return lastOf(theirMoves) ?? "cooperate";
  },
};

export const ScrewYou: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return "defect";
  },
};

export const NiceGuy: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return "cooperate";
  },
};

export const Random: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return Math.random() < 0.5 ? "cooperate" : "defect";
  },
};

export const YesYesNoNoNo: Strategy = {
  /**
   * cooperate for 2 moves, defect for 3
   */
  chooseNextMove(myMoves, theirMoves) {
    return (myMoves.length % 5) < 2 ? "cooperate" : "defect";
  },
};

export const CassandraBot: Strategy = {
  /**
   * start mean.
   * after they defect, you become nice for 3 rounds.
   */
  chooseNextMove(myMoves, theirMoves) {
    const isGuilty = theirMoves.slice(theirMoves.length - 3).includes("defect");
    return isGuilty ? "cooperate" : "defect";
  },
};

export const OzStrategy: Strategy = {
  timesGottenScrewed: 0,

  chooseNextMove(myMoves, theirMoves) {
    if (lastOf(theirMoves) == "defect") {
      this.timesGottenScrewed++;
    }
    return this.timesGottenScrewed <= 3 ? "cooperate" : "defect";
  },

  onNewGame() {
    this.timesGottenScrewed = 0;
  },
};
