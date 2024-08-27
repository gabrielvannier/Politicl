import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Person } from "../../utils/types";

type InputProps = {
    handleSubmit: (e: React.FormEvent<Element>) => void;
    possibleGuessesRecord: Record<string, Person>;
    isFinished: boolean
};
function Input(
    { handleSubmit, possibleGuessesRecord, isFinished }: InputProps
){
    const [key, setKey] = React.useState<number>(0);
    const onSubmit = (e: React.FormEvent<Element>) => {
        handleSubmit(e);
        setKey(key + 1);
    }
    return (
        <div className="Input-guess">
            <form onSubmit={onSubmit}>
                <Autocomplete
                    id="guess-input"
                    disabled={isFinished}
                    options={Object.values(possibleGuessesRecord).map(person => person.name).sort()}
                    autoHighlight={true}
                    renderInput={(params) => <TextField {...params} label="Rechercher" />}
                    key={key} // This is the key to re-render the component
                />
            </form>
        </div>
    );
}

export default Input;