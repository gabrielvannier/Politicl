import React from "react";
import { Person } from "../../utils/types";
import { MAX_NUMBER_OF_TRY } from "../../utils/constants";
import { Cell, ColumnHeadlines } from "./Cell";

function Guess({
  guess,
  expectedPerson,
}: {
  guess: Person | undefined;
  expectedPerson: Person;
}) {
  return (
    <p
      className="Guess-cells"
      style={{
        display: "flex",
        gap: "1%",
        maxWidth: "1200px",
        width: "97%",
        justifyContent: "space-evenly",
        margin: "1vw",
      }}
    >
      <Cell
        value={guess?.sexe}
        expectedValue={expectedPerson.sexe}
        displayedColumn="sexe"
        displayOrder={1}
      />
      <Cell
        value={guess?.highestRole}
        expectedValue={expectedPerson.highestRole}
        displayedColumn="highestRole"
        displayOrder={2}
      />
      <Cell
        value={guess?.party}
        expectedValue={expectedPerson.party}
        displayedColumn="party"
        displayOrder={3}
      />
      <Cell
        value={guess?.birthDate}
        expectedValue={expectedPerson.birthDate}
        displayedColumn="birthDate"
        displayOrder={4}
      />
      <Cell
        value={guess?.name}
        expectedValue={expectedPerson.name}
        displayedColumn="name"
        displayOrder={5}
      />
    </p>
  );
}

function GuessList({
  guesses,
  expectedPerson,
}: {
  guesses: Person[];
  expectedPerson: Person;
}) {
  if (expectedPerson === null) {
    return <div />;
  }
  return (
    <div className="Guesses" style={{ marginTop: "50px", height: "50%" }}>
      <ul
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {false && <ColumnHeadlines />}
        {Array.from({ length: MAX_NUMBER_OF_TRY }).map((_, index) => {
          var guess = undefined;
          if (index < guesses.length) {
            guess = guesses[index];
          }
          return (
            <Guess guess={guess} expectedPerson={expectedPerson} key={index} />
          );
        })}
      </ul>
    </div>
  );
}

export default GuessList;
