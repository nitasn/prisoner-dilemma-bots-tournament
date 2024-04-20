///////////////////////////////////////////////////////////////
///                   T O U R N A M E N T                   ///
///////////////////////////////////////////////////////////////

import { Move } from "./types";
import * as candidatesModule from "./candidates";
import { range } from "./utils";

const candidates = Object.entries(candidatesModule).map(([name, obj]) => ({
  name,
  ...obj,
}));

const NUM_ROUNDS = 1000;
const ROUND_LENGTH = 1000;

/**
 * scoresTable[idxA][idxB] = the total points botA got when playing against botB.
 */
const scoresTable = candidates.map(_ => Array(candidates.length).fill(0));

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

        if (moveA == "coöperate" && moveB == "coöperate") {
          scoresTable[idxA][idxB] += 3;
          scoresTable[idxB][idxA] += 3;
        }
        else if (moveA == "coöperate" && moveB == "defect") {
          scoresTable[idxA][idxB] += 0;
          scoresTable[idxB][idxA] += 5;
        }
        else if (moveA == "defect" && moveB == "coöperate") {
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
 * Print those AVERAGES in a nicely formatted table.
 */
for (let idxA = 0; idxA < candidates.length; idxA++) {
  for (let idxB = idxA; idxB < candidates.length; idxB++) {
    const avgA = scoresTable[idxA][idxB].toFixed(2);
    const avgB = scoresTable[idxB][idxA].toFixed(2);

    const botA = candidates[idxA].name;
    const botB = candidates[idxB].name;

    const maxWidth = Math.max(
      ...candidates.map(({ name }) => name.length),
      avgA.length,
      avgB.length
    );

    const fixedWidth = (entry: string) =>
      entry + " ".repeat(maxWidth - entry.length);

    console.log(`
      ${fixedWidth(botA)}   ${fixedWidth(botB)}
      ${fixedWidth(avgA)}   ${fixedWidth(avgB)}
    `);
  }
}
