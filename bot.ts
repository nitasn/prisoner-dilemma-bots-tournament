///////////////////////////////////////////////////////////////
///                   C A N D I D A T E S                   ///
///////////////////////////////////////////////////////////////

import { Move } from "./types";
import { lastOf } from "./utils";


abstract class Bot {
  abstract chooseNextMove(myMoves: Move[], theirMoves: Move[]): Move;

  onOpponentResponse(myMove: Move, theirMove: Move): void {
    // To be overridden if needed.
  }
}

export class TitForTat extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    return lastOf(theirMoves) ?? Move.Coöperate;
  }
}


export class CassandraBot extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    /**
     * start mean.
     * after they defect, you become nice for 3 rounds.
     */
    const isGuilty = theirMoves.slice(theirMoves.length - 3).includes(Move.Defect);
    return isGuilty ? Move.Coöperate : Move.Defect;
  }
}


export class ScrewYou extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    return Move.Defect;
  }
}


export class NiceGuy extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    return Move.Coöperate;
  }
}


export class Random extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    return Math.random() < 0.5 ? Move.Coöperate : Move.Defect;
  }
}


export class Nice2every5 extends Bot {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    /**
     * cooperate for 2 moves, defect for 3
     */
    return (myMoves.length % 5) <= 2 ? Move.Coöperate : Move.Defect;
  }
}


export class OzStrategy extends Bot {
  theirDefectsCount = 0;

  chooseNextMove(myMoves: Move[], theirMoves: Move[]) {
    return this.theirDefectsCount <= 3 ? Move.Coöperate : Move.Defect;
  }

  onOpponentResponse(myMove: Move, theirMove: Move) {
    if (theirMove == Move.Defect) {
      this.theirDefectsCount++;
    }
  }
}
