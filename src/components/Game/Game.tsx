import React, { useEffect, useState } from "react";
import GuessList from "./GuessList";
import Input from "./Input";
import { Person } from "../../utils/types";
import Confetti from "react-confetti-boom";
import {
  load,
  selectExpectedPerson,
  getDaySincePolitclFirstEdition,
} from "../../utils/utils";
import { FinishedPopUp, GuidePopUp } from "./PopUp";
import { confettiColors } from "../../utils/constants";

function Game() {
  const [guesses, setGuesses] = useState<Person[]>(
    localStorage.getItem("guesses")
      ? JSON.parse(localStorage.getItem("guesses")!)
      : []
  );
  const [possibleGuessesRecord, setPossibleGuessesRecord] = useState<
    Record<string, Person>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [expectedPerson, setExpectedPerson] = useState<Person | undefined>();
  const [isFinished, setIsFinished] = useState(false);
  const [isWinned, setIsWinned] = useState(false);
  const [showEndFeatures, setShowEndFeatures] = useState(false);
  const hasSeenGuide = localStorage.getItem("hasSeenGuide") === "true";
  const [storedDayNumber, setStoredDayNumber] = useState(
    localStorage.getItem("dayNumber")
      ? JSON.parse(localStorage.getItem("dayNumber")!)
      : 0
  );

  //clear the localStorage when the stored day number is different from the current day number
  useEffect(() => {
    localStorage.setItem("dayNumber", JSON.stringify(storedDayNumber));
    if (storedDayNumber !== getDaySincePolitclFirstEdition()) {
      localStorage.setItem("guesses", JSON.stringify([]));
      setGuesses([]);
      setStoredDayNumber(getDaySincePolitclFirstEdition());
    }
  }, [storedDayNumber]);

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setShowEndFeatures(true);
      }, 4500);
    }
  }, [isFinished]);

  useEffect(() => {
    load(setPossibleGuessesRecord, setIsLoading);
  }, []);

  useEffect(() => {
    if (!isLoading && Object.keys(possibleGuessesRecord).length > 0) {
      setExpectedPerson(selectExpectedPerson(possibleGuessesRecord));
    }
  }, [isLoading, possibleGuessesRecord]);

  useEffect(() => {
    //populate the localStorage
    if (expectedPerson === undefined) {
      return;
    }
    localStorage.setItem("guesses", JSON.stringify(guesses));
    setIsFinished(isGameFinished(guesses, expectedPerson!));
    setIsWinned(isGameWinned(guesses, expectedPerson!));
  }, [guesses, expectedPerson]);

  const isGameWinned = (guesses: Person[], expectedPerson: Person) => {
    if (guesses.length === 0) {
      return false;
    }
    return guesses[guesses.length - 1].name === expectedPerson.name;
  };
  const isGameFinished = (guesses: Person[], expectedPerson: Person) => {
    return isGameWinned(guesses, expectedPerson) || guesses.length > 5;
  };

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const guessInput = document.getElementById(
      "guess-input"
    ) as HTMLInputElement;
    const newGuess = guessInput.value;
    if (possibleGuessesRecord[newGuess]) {
      setGuesses((prevGuesses) => [
        ...prevGuesses,
        possibleGuessesRecord[newGuess],
      ]);
    }
    guessInput.value = "";
  };

  if (isLoading || expectedPerson === undefined) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="Game">
      {guesses.length === 0 && (
        <div className="Start-advice">
          Recherche n'importe quelle personne pour commencer
        </div>
      )}
      {!hasSeenGuide && <GuidePopUp />}
      {showEndFeatures && (
        <FinishedPopUp
          isWinned={isWinned}
          expectedPerson={expectedPerson}
          guesses={guesses}
          dayNumber={getDaySincePolitclFirstEdition()}
        />
      )}
      {showEndFeatures && isWinned && (
        <Confetti
          mode={"fall"}
          particleCount={70}
          shapeSize={25}
          colors={confettiColors}
        />
      )}
      <Input
        handleSubmit={handleSubmit}
        possibleGuessesRecord={possibleGuessesRecord}
        isFinished={isFinished}
      />
      <GuessList guesses={guesses} expectedPerson={expectedPerson} />
    </div>
  );
}

export default Game;
