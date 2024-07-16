import React, { useCallback, useEffect, useState } from "react";
import GuessList from "./GuessList";
import Input from "./Input";
import { Person } from "./types";
import { load } from "./utils";

function Game() {
    const [guesses, setGuesses] = useState<Person[]>([]);
    const [possibleGuessesRecord, setPossibleGuessesRecord] = useState<Record<string, Person>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [expectedPerson, setExpectedPerson] = useState<Person | undefined>();

    const selectExpectedPerson = () => {
        const possibleGuesses = Object.values(possibleGuessesRecord);
        const randomIndex = Math.floor(Math.random() * possibleGuesses.length);
        return possibleGuesses[randomIndex];
    }

    useEffect(() => {
        load(setPossibleGuessesRecord, setIsLoading);
    }, []);
    useEffect(() => {
        if (!isLoading && Object.keys(possibleGuessesRecord).length > 0) {
            setExpectedPerson(selectExpectedPerson());
        }
    }, [isLoading, possibleGuessesRecord]);
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
            <Input handleSubmit={handleSubmit} possibleGuessesRecord={possibleGuessesRecord} />
            <GuessList guesses={guesses} expectedPerson={expectedPerson} />
        </div>
    );
}

export default Game;
