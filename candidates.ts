///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { Move } from "./types";
import { lastOf } from "./utils";

interface Strategy {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]): Move;

  // optional callback for bots to have
  onNewGame?(): void;

  // allows state properties
  [key: string]: any;
}

export const TitForTat: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return lastOf(theirMoves) ?? "coöperate";
  },
};

export const ScrewYou: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return "defect";
  },
};

export const NiceGuy: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return "coöperate";
  },
};

export const Random: Strategy = {
  chooseNextMove(myMoves, theirMoves) {
    return Math.random() < 0.5 ? "coöperate" : "defect";
  },
};

export const YesYesNoNoNo: Strategy = {
  /**
   * cooperate for 2 moves, defect for 3
   */
  chooseNextMove(myMoves, theirMoves) {
    return (myMoves.length % 5) <= 2 ? "coöperate" : "defect";
  },
};

export const CassandraBot: Strategy = {
  /**
   * start mean.
   * after they defect, you become nice for 3 rounds.
   */
  chooseNextMove(myMoves, theirMoves) {
    const isGuilty = theirMoves.slice(theirMoves.length - 3).includes("defect");
    return isGuilty ? "coöperate" : "defect";
  },
};

export const OzStrategy: Strategy = {
  timesGottenScrewed: 0,

  chooseNextMove(myMoves, theirMoves) {
    if (lastOf(theirMoves) == "defect") {
      this.timesGottenScrewed++;
    }
    return this.timesGottenScrewed <= 3 ? "coöperate" : "defect";
  },

  onNewGame() {
    this.timesGottenScrewed = 0;
  },
};
