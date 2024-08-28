import * as Papa from "papaparse";
import { Person } from "./types";

const homemadeRandom = (seed:number,max_number:number)=> {
    var x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x))*max_number);
}

const getDaySinceEpoch = () => {
    const now = new Date();
    return Math.floor(now.valueOf()/8.64e7);
}
export const getDaySincePolitclFirstEdition = () => {
    const firstEditionDaySinceEpoch = 19955;
    return getDaySinceEpoch() - firstEditionDaySinceEpoch;
}
export const selectExpectedPerson = (possibleGuessesRecord:Record<string, Person>) => {
    const possibleGuesses = Object.values(possibleGuessesRecord);
    const seed = getDaySinceEpoch();
    const randomIndex = homemadeRandom(seed,possibleGuesses.length);
    return possibleGuesses[randomIndex];
}
const parseDate = function (date: string) {
    // date format is "YYYY-MM-DD"
    const dateParts = date.split(" ");
    return Number(dateParts[2])
}

const parseLine = function (line: string[]) {
    return {
        name: line[0],
        sexe: line[1],
        birthDate: parseDate(line[2]),
        //deathDate: line[2] !== "" ? parseDate(line[2]) : null,
        party: line[3],
        highestRole: line[4],
        deathDate:null
    }
}
export const load = function (
    setPossibleGuessesRecord: (value: Record<string, Person>) => void,
    setIsLoading: (value: boolean) => void
) {
    fetch('./data.csv')
        .then(response => response.text())
        .then(responseText => {
            var data = Papa.parse(responseText);
            if (typeof (data.data) === "object") {
                const newPossibleGuessesRecord: Record<string, Person> = {};
                data.data.forEach(line => {
                    if (Array.isArray(line) && line.length === 5) {
                        const newPerson = parseLine(line);
                        newPossibleGuessesRecord[newPerson.name] = newPerson;
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