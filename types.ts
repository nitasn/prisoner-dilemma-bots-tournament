///////////////////////////////////////////////////////////////
///                        T Y P E S                        ///
///////////////////////////////////////////////////////////////

export type Move = "cooperate" | "defect";

export interface Strategy {
  chooseNextMove(myMoves: Move[], theirMoves: Move[]): Move;

  // optional callback for bots to have
  onNewGame?(): void;

  // allows state properties
  [key: string]: any;
}