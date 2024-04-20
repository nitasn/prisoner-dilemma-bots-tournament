import { Move } from "./types";
import * as candidatesModule from "./candidates";
import { average, range, round } from "./utils";

///////////////////////////////////////////////////////////////
///                   T O U R N A M E N T                   ///
///////////////////////////////////////////////////////////////

const candidates = Object.entries(candidatesModule).map(([name, obj]) => ({
  name,
  ...obj,
}));

const NUM_ROUNDS = 1000;
const ROUND_LENGTH = 1000;

/**
 * scoresTable[idxA][idxB] = total points botA got against botB.
 */
const scoresTable: number[][] = candidates.map(_ => Array(candidates.length).fill(0));

for (const round of range(NUM_ROUNDS)) {
  for (let idxA = 0; idxA < candidates.length; idxA++) {
    for (let idxB = idxA; idxB < candidates.length; idxB++) {

      candidates[idxA].onNewGame?.();
      candidates[idxB].onNewGame?.();

      const movesA: Move[] = [];
      const movesB: Move[] = [];

      for (const move of range(ROUND_LENGTH)) {
        const moveA = candidates[idxA].chooseNextMove(movesA, movesB);
        const moveB = candidates[idxB].chooseNextMove(movesB, movesA);

        movesA.push(moveA);
        movesB.push(moveB);

        if (moveA == "cooperate" && moveB == "cooperate") {
          scoresTable[idxA][idxB] += 3;
          scoresTable[idxB][idxA] += 3;
        }
        else if (moveA == "cooperate" && moveB == "defect") {
          scoresTable[idxA][idxB] += 0;
          scoresTable[idxB][idxA] += 5;
        }
        else if (moveA == "defect" && moveB == "cooperate") {
          scoresTable[idxA][idxB] += 5;
          scoresTable[idxB][idxA] += 0;
        }
        else if (moveA == "defect" && moveB == "defect") {
          scoresTable[idxA][idxB] += 1;
          scoresTable[idxB][idxA] += 1;
        }
      }
    }
  }
}

///////////////////////////////////////////////////////////////
///                        S T A T S                        ///
///////////////////////////////////////////////////////////////

/**
 * The AVERAGE points per turn that botA got against botB.
 */
for (let idxA = 0; idxA < candidates.length; idxA++) {
  for (let idxB = idxA; idxB < candidates.length; idxB++) {
    scoresTable[idxA][idxB] /= NUM_ROUNDS * ROUND_LENGTH;

    if (idxA != idxB) {
      scoresTable[idxB][idxA] /= NUM_ROUNDS * ROUND_LENGTH;
    }
    else {
      scoresTable[idxA][idxB] /= 2;
    }
  }
}

/**
 * Print 2D AVERAGES in a nicely formatted table.
 */
const scores2D = candidates.map(({ name: rowName }, rowIdx) => {
  const row = Object.fromEntries(
    candidates.map(({ name: colName }, colIdx) => 
      [colName, round(scoresTable[rowIdx][colIdx], 2)]
    )
  );
  return { [rowName]: row };
});

console.log("\n average points bot[row] got against bot[column]");
console.table(Object.assign({}, ...scores2D));


/**
 * Print 1D AVERAGES in descending order.
 */
const avgScore = new WeakMap(candidates.map((candidate, idx) => {
  return [candidate, average(scoresTable[idx])]
}));

const candidatesSortedByAvgScore = [...candidates].sort((botA, botB) => {
  return avgScore.get(botB)! - avgScore.get(botA)!;
});

const scores1D = candidatesSortedByAvgScore.map((candidate) => {
  const row = { Average: round(avgScore.get(candidate)!, 2) };
  return { [candidate.name]: row };
});

console.log("\n average against bots got on total");
console.table(Object.assign({}, ...scores1D));
