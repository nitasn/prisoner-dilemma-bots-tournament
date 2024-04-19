///////////////////////////////////////////////////////////////
///                   T O U R N A M E N T                   ///
///////////////////////////////////////////////////////////////

import { Action } from "./types";
import * as candidatesObject from "./candidates";
import { range } from "./utils";

const candidateNames = Object.keys(candidatesObject);
const candidateFuncs = Object.values(candidatesObject);


const NUM_ROUNDS = 1000;
const ROUND_LENGTH = 1000;

const scoresTable = range(candidateFuncs.length).map((_ => Array(candidateFuncs.length).fill(0)));

for (const round of range(NUM_ROUNDS)) {
  for (let idxA = 0; idxA < candidateFuncs.length - 1; idxA++) {
    for (let idxB = idxA + 1; idxB < candidateFuncs.length; idxB++) {
      
      const actionsA: Action[] = [];
      const actionsB: Action[] = [];

      for (const subgame of range(ROUND_LENGTH)) {
        const actA = candidateFuncs[idxA](actionsA, actionsB);
        const actB = candidateFuncs[idxB](actionsB, actionsA);

        actionsA.push(actA);
        actionsB.push(actB);

        if (actA == 'cooperate' && actB == 'cooperate') {
          scoresTable[idxA][idxB] += 3;
          scoresTable[idxB][idxA] += 3;
        }
        else if (actA == 'cooperate' && actB == 'defect') {
          scoresTable[idxA][idxB] += 0;
          scoresTable[idxB][idxA] += 5;
        }
        else if (actA == 'defect' && actB == 'cooperate') {
          scoresTable[idxA][idxB] += 5;
          scoresTable[idxB][idxA] += 0;
        }
        else if (actA == 'defect' && actB == 'defect') {
          scoresTable[idxA][idxB] += 1;
          scoresTable[idxB][idxA] += 1;
        }
      }
    }
  }
}

for (let idxA = 0; idxA < candidateFuncs.length - 1; idxA++) {
  for (let idxB = idxA + 1; idxB < candidateFuncs.length; idxB++) {
    
    const scoreA = scoresTable[idxA][idxB] / (NUM_ROUNDS * ROUND_LENGTH);
    const scoreB = scoresTable[idxB][idxA] / (NUM_ROUNDS * ROUND_LENGTH);

    const stringScoreA = scoreA.toFixed(2);
    const stringScoreB = scoreB.toFixed(2);

    const maxWidth = Math.max(
      ...candidateNames.map((name) => name.length), 
      stringScoreA.length, 
      stringScoreB.length,
    );

    const fixedWidth = (thing: string|number) => thing + ' '.repeat(maxWidth - thing.toString().length);

    console.log(`
      ${fixedWidth(candidateNames[idxA])}   ${fixedWidth(candidateNames[idxB])}
      ${fixedWidth(stringScoreA)}   ${fixedWidth(stringScoreB)}
    `);
  }
}