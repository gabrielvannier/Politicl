import * as Papa from "papaparse";
import { Person, Role } from "./types";
import { useMediaQuery } from "@mui/material";


export function useIsMobile() {
    const mobileQuery = '(max-width: 1175px)';
    return useMediaQuery(mobileQuery);
}


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
        highestRole: line[4] as Role,
        hintType: line[5] as "quote" | "hint",
        hint: line[6],
        wikipedia_link: line[7]
    }
}
export const load = function (
    setPossibleGuessesRecord: (value: Record<string, Person>) => void,
    setIsLoading: (value: boolean) => void
) {
    fetch('./data_with_wiki.csv')
        .then(response => response.text())
        .then(responseText => {
            const data = Papa.parse(responseText);
            if (typeof (data.data) === "object") {
                const newPossibleGuessesRecord: Record<string, Person> = {};
                data.data.forEach(line => {
                    if (Array.isArray(line) && line.length === 8) {
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

// Function to fetch the main image from a Wikipedia article URL
export async function getMainImageUrlFromWikipedia(url: string): Promise<string | null> {
    try {
        // Extract the title from the Wikipedia URL
        const articleTitle = url.split('/wiki/')[1];

        // Wikipedia API URL for querying the article's main image
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${articleTitle}&prop=pageimages&format=json&origin=*`;

        // Fetch data from the Wikipedia API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract the page information
        const pages = data.query.pages;
        const page = Object.values(pages)[0] as { pageimage?: string }; // Get the first page object

        // Check if there is a main image available
        if (page.pageimage) {
            // Return the URL of the main image
            return `https://en.wikipedia.org/wiki/Special:FilePath/${page.pageimage}`;
        } else {
            console.log('No main image available for this article.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching the main image:', error);
        return null;
    }
}