///////////////////////////////////////////////////////////////
///                   T O U R N A M E N T                   ///
///////////////////////////////////////////////////////////////

import { Move } from "./types";
import * as candidatesObject from "./candidates";
import { range } from "./utils";

const candidateNames = Object.keys(candidatesObject);
const candidateFuncs = Object.values(candidatesObject);


const NUM_ROUNDS = 1000;
const ROUND_LENGTH = 1000;

/**
 * scoresTable[idxA][idxB] = the total points funcA got when playing against funcB.
 */
const scoresTable = candidateFuncs.map((_ => Array(candidateFuncs.length).fill(0)));


for (const round of range(NUM_ROUNDS)) {
  for (let idxA = 0; idxA < candidateFuncs.length; idxA++) {
    for (let idxB = idxA; idxB < candidateFuncs.length; idxB++) {

      const movesA: Move[] = [];
      const movesB: Move[] = [];

      for (const move of range(ROUND_LENGTH)) {
        const moveA = candidateFuncs[idxA](movesA, movesB);
        const moveB = candidateFuncs[idxB](movesB, movesA);

        movesA.push(moveA);
        movesB.push(moveB);

        if (moveA == Move.Coöperate && moveB == Move.Coöperate) {
          scoresTable[idxA][idxB] += 3;
          scoresTable[idxB][idxA] += 3;
        }
        else if (moveA == Move.Coöperate && moveB == Move.Defect) {
          scoresTable[idxA][idxB] += 0;
          scoresTable[idxB][idxA] += 5;
        }
        else if (moveA == Move.Defect && moveB == Move.Coöperate) {
          scoresTable[idxA][idxB] += 5;
          scoresTable[idxB][idxA] += 0;
        }
        else if (moveA == Move.Defect && moveB == Move.Defect) {
          scoresTable[idxA][idxB] += 1;
          scoresTable[idxB][idxA] += 1;
        }
      }
    }
  }
}

/**
 * The AVERAGE points per turn that funcA got against funcB.
 */
for (let idxA = 0; idxA < candidateFuncs.length; idxA++) {
  for (let idxB = idxA; idxB < candidateFuncs.length; idxB++) {

    scoresTable[idxA][idxB] /= (NUM_ROUNDS * ROUND_LENGTH);

    if (idxA != idxB) {
      scoresTable[idxB][idxA] /= (NUM_ROUNDS * ROUND_LENGTH);
    }
    else {
      scoresTable[idxA][idxB] /= 2;
    }
  }
}

/**
 * Print these AVERAGES in a nicely formatted table.
 */
for (let idxA = 0; idxA < candidateFuncs.length; idxA++) {
  for (let idxB = idxA; idxB < candidateFuncs.length; idxB++) {

    const avgA = scoresTable[idxA][idxB].toFixed(2);
    const avgB = scoresTable[idxB][idxA].toFixed(2);

    const botA = candidateNames[idxA];
    const botB = candidateNames[idxB];

    const maxWidth = Math.max(
      ...candidateNames.map((name) => name.length),
      avgA.length,
      avgB.length,
    );

    const fixedWidth = (entry: string) => entry + ' '.repeat(maxWidth - entry.length);

    console.log(`
      ${fixedWidth(botA)}   ${fixedWidth(botB)}
      ${fixedWidth(avgA)}   ${fixedWidth(avgB)}
    `);
  }
}