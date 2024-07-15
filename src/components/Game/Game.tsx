import { on } from "events";
import React, { useCallback } from "react";
import GuessList from "./GuessList";
import Input from "./Input";


function Game() {
    const [guesses, setGuesses] = React.useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        const guessInput = document.getElementById("guess-input") as HTMLInputElement;
        const newGuess = guessInput.value;
        console.log("newGuess", newGuess);
        setGuesses(prevGuesses => [...prevGuesses, newGuess]);
        guessInput.value = "";
    };

    return (
        <div className="Game">
            <Input handleSubmit={handleSubmit} />
            <GuessList guesses={guesses} />
        </div>
    );
}

export default Game;
