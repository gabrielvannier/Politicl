import React from "react";
import { partyRightnessScore } from "../../../utils/constants";

export function PartyTooltipInside({
  guessedParty,
  expectedParty,
}: {
  guessedParty: string;
  expectedParty: string;
}) {
  if (
    !partyRightnessScore.hasOwnProperty(guessedParty) ||
    !partyRightnessScore.hasOwnProperty(expectedParty)
  ) {
    return <span />;
  }
  if (guessedParty === expectedParty) {
    return <span>membre de {guessedParty} ✅</span>;
  }
  if (
    partyRightnessScore[guessedParty] === partyRightnessScore[expectedParty]
  ) {
    return <span>même bord politique que {guessedParty}</span>;
  }
  if (partyRightnessScore[guessedParty] > partyRightnessScore[expectedParty]) {
    return <span>⬅️ plus à gauche que {guessedParty}</span>;
  }
  return <span>plus à droite que ➡️{guessedParty}</span>;
}
