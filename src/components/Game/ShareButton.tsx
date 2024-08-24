import { useState, useEffect } from "react";
import { Person } from "../../utils/types";
import { getAdviceText } from "./Advice";
import { Button } from "@mui/material";
import { ContentPaste } from "@mui/icons-material";
import { blue } from "../../utils/constants";
import { get } from "jquery";

const getGuessResults = (guess: Person, expectedPerson: Person) => {
    const results = [
        getAdviceText("sexe", guess.sexe, expectedPerson.sexe),
        getAdviceText("highestRole", guess.highestRole, expectedPerson.highestRole),
        getAdviceText("party", guess.party, expectedPerson.party),
        getAdviceText("birthDate", guess.birthDate, expectedPerson.birthDate),
        getAdviceText("name", guess.name, expectedPerson.name)
    ]
    return results;
}
const getGuessesResults = (guesses: Person[], expectedPerson: Person) => {
    return guesses.map(guess => getGuessResults(guess, expectedPerson));
}

const graphicalySimplifyResult = (char:string) =>{
    return char.replace("✅","🟩").replace("❌","🟥").replace("🟰","🟧")
}

export const getResultToShare = (guesses: Person[], expectedPerson: Person) => {
    const guessesResults = getGuessesResults(guesses, expectedPerson);
    const textToShare = guessesResults.map((guessResults, index) => {
        return "\n" + guessResults.map((result, index) => {
            return graphicalySimplifyResult(result)
        }).join("")
    })
    return textToShare;
}

const getTextToShare = (guesses: Person[], expectedPerson: Person, dayNumber: number) => {
    const textToShareIntro = `#POLITCL #${dayNumber} #${guesses.length}/6 \n`
    const resultToShare = getResultToShare(guesses, expectedPerson);
    return textToShareIntro + resultToShare;
}

export function ShareButton({ expectedPerson, guesses, dayNumber }: { expectedPerson: Person, guesses: Person[], dayNumber: number }) {
    const [copied, setCopied] = useState(false);
    const [testToCopy, setTestToCopy] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(testToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    useEffect(() => {
        setTestToCopy(getTextToShare(guesses, expectedPerson, dayNumber));
    }, [])
    return (
        <Button variant="contained" endIcon={<ContentPaste />} onClick={copyToClipboard} style={{ backgroundColor: blue }} >{copied ? "Lien copié" : "Partager"}</Button>

    )
}