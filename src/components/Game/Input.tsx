import React, { useState } from "react";
import { Autocomplete, TextField, Button, Tooltip } from "@mui/material";
import { Person } from "../../utils/types";
import { HowToVote } from "@mui/icons-material";
import { blue } from "../../utils/constants";

type InputProps = {
    handleSubmit: (e: React.FormEvent<Element>) => void;
    possibleGuessesRecord: Record<string, Person>;
    isFinished: boolean
};
function Input(
    { handleSubmit, possibleGuessesRecord, isFinished }: InputProps
) {
    const [key, setKey] = useState<number>(0);
    const [inputValue, setInputValue] = React.useState('');
    const [enableButton, setEnableButton] = useState<boolean>(false);

    const handleInputChange = (e: React.SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue);
        if (possibleGuessesRecord[newInputValue]) {
            setEnableButton(true);
        } else {
            setEnableButton(false);
        }
    }
    const onSubmit = (e: React.FormEvent<Element>) => {
        handleSubmit(e);
        setKey(key + 1);
    }
    const buttonStyle: React.CSSProperties = {
        minWidth: "55px",
        minHeight: "55px",
    };
    return (
        <div className="Input-guess">
            <form onSubmit={onSubmit} style={{flexGrow:1,display:"flex",gap:"1em"}}>
                    <Autocomplete
                        id="guess-input"
                        disabled={isFinished}
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        options={Object.values(possibleGuessesRecord).map(person => person.name).sort()}
                        autoHighlight={true}
                        renderInput={(params) => <TextField {...params} label="Rechercher" />}
                        key={key} // This is the key to re-render the component
                        clearOnBlur={true}
                        selectOnFocus={true}
                        style={{flexGrow:1}}
                    />
                    <Tooltip title="Valider">
                        <span>
                        <Button type="submit" variant="contained" style={{ ...buttonStyle, backgroundColor: enableButton ? blue : "" }} disabled={!enableButton}>
                            <HowToVote />
                        </Button>
                        </span>
                    </Tooltip>
            </form>
        </div>
    );
}

export default Input;