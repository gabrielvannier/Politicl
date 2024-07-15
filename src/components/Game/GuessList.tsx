import React from "react";

function GuessList(
    { guesses }: { guesses: string[] }
) {
    return (
        <div className="Guesses">
            <ul>
                {guesses.map((guess, index) => {
                    console.log("listing", guess);
                    return <li key={index}>{guess}</li>
                })}
            </ul>
        </div>)
}

export default GuessList