import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import * as Papa from "papaparse";
import { Person } from "./types";


type InputProps = {
    handleSubmit: (e: React.FormEvent<Element>) => void;
};

function Input({ handleSubmit }: InputProps) {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Input-guess">
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    id="guess-input"
                    options={Object.values(possibleGuessesRecord)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Personality" />}
                />
            </form>
        </div>
    );
}

export default Input;