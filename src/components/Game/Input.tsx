import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Person } from "./types";


type InputProps = {
    handleSubmit: (e: React.FormEvent<Element>) => void;
    possibleGuessesRecord: Record<string, Person>;
};
function Input(
    { handleSubmit, possibleGuessesRecord }: InputProps
){
    return (
        <div className="Input-guess">
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    id="guess-input"
                    options={Object.values(possibleGuessesRecord)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Personnalité politique" />}
                />
            </form>
        </div>
    );
}

export default Input;