import { on } from "events";
import React, { useCallback, useEffect, useState } from "react";
import GuessList from "./GuessList";
import Input from "./Input";
import * as Papa from "papaparse";
import { Person } from "./types";

function Game() {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [possibleGuessesRecord, setPossibleGuessesRecord] = useState<Record<string, Person>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = function () {
        fetch('./data.csv')
            .then(response => response.text())
            .then(responseText => {
                var data = Papa.parse(responseText);
                if (typeof (data.data) === "object") {
                    const newPossibleGuessesRecord: Record<string, Person> = {};
                    data.data.forEach(line => {
                        if (Array.isArray(line) && line.length === 6) {
                            newPossibleGuessesRecord[line[0]] = { name: line[0], birthDate: line[1], deathDate: line[2], party: line[3], highestRole: line[4], sexe: line[5] };
                        }
                    });
                    setPossibleGuessesRecord(newPossibleGuessesRecord);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Error loading data:", error);
                setIsLoading(false);
            });
    };
    
    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        const guessInput = document.getElementById("guess-input") as HTMLInputElement;
        const newGuess = guessInput.value;
        console.log("newGuess", newGuess);
        setGuesses(prevGuesses => [...prevGuesses, newGuess]);
        guessInput.value = "";
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Game">
            <Input handleSubmit={handleSubmit} possibleGuessesRecord={possibleGuessesRecord} />
            <GuessList guesses={guesses} />
        </div>
    );
}

export default Game;
