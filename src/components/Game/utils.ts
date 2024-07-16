import * as Papa from "papaparse";
import { Person } from "./types";


const parseDate = function (date: string) {
    // date format is "YYYY-MM-DD"
    const dateParts = date.split("-");
    return Number(dateParts[0])
}

const parseLine = function (line: string[]) {
    return {
        name: line[0],
        birthDate: parseDate(line[1]),
        deathDate: line[2] !== "" ? parseDate(line[2]) : null,
        party: line[3],
        highestRole: line[4],
        sexe: line[5]
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
                    if (Array.isArray(line) && line.length === 6) {
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