import React, { useCallback, useEffect, useState } from "react";
import GuessList from "./GuessList";
import Input from "./Input";
import { Person } from "../../utils/types";
import Confetti from 'react-confetti-boom';
import { load, selectExpectedPerson, getDaySincePolitclFirstEdition } from "../../utils/utils";
import { WinningPopUp, GuidePopUp } from "./PopUp";
import { confettiColors } from "../../utils/constants";


function Game() {
    const [guesses, setGuesses] = useState<Person[]>([]);
    const [possibleGuessesRecord, setPossibleGuessesRecord] = useState<Record<string, Person>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [expectedPerson, setExpectedPerson] = useState<Person | undefined>();
    const [isFinished, setIsFinished] = useState(false);
    const [isWinned, setIsWinned] = useState(false);
    const [showWinningFeature, setShowWinningFeature] = useState(false);

    useEffect(() => {
        if (isWinned) {
            setTimeout(() => {
                setShowWinningFeature(true);
            }, 4500);
        }
    }, [isWinned]);

    useEffect(() => {
        load(setPossibleGuessesRecord, setIsLoading);
    }, []);
    useEffect(() => {
        if (!isLoading && Object.keys(possibleGuessesRecord).length > 0) {
            setExpectedPerson(selectExpectedPerson(possibleGuessesRecord));
        }
        console.log(expectedPerson?.name)
    }, [isLoading, possibleGuessesRecord]);

    const isGameFinished = (guesses: Person[], expectedPerson: Person) => {
        if (guesses.length === 0) {
            return false;
        }
        if (guesses[guesses.length - 1] === expectedPerson) {
            setIsWinned(true);
            console.log("winned")
            return true;
        }
        return guesses.length > 5;
    }
    useEffect(() => {
        setIsFinished(isGameFinished(guesses, expectedPerson!));
        if (isGameFinished(guesses, expectedPerson!)) {
            console.log("game finished")
        }
    }, [guesses]);

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        const guessInput = document.getElementById("guess-input") as HTMLInputElement;
        const newGuess = guessInput.value;
        if (possibleGuessesRecord[newGuess]) {
            setGuesses(prevGuesses => [...prevGuesses, possibleGuessesRecord[newGuess]]);
        }
        guessInput.value = "";
    };

    if (isLoading || expectedPerson === undefined) {
        return <div>Loading...</div>;
    }
    return (
        <div className="Game">
            <GuidePopUp/>
            {showWinningFeature && <WinningPopUp expectedPerson={expectedPerson} dayNumber={getDaySincePolitclFirstEdition()}/>}
            {showWinningFeature && <Confetti mode={"fall"} particleCount={70} shapeSize={25} colors={confettiColors}/>}
            <Input handleSubmit={handleSubmit} possibleGuessesRecord={possibleGuessesRecord} />
            <GuessList guesses={guesses} expectedPerson={expectedPerson} />
        </div>
    );
}

export default Game;
