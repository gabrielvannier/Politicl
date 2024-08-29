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
    const inputTextStyle: React.CSSProperties = {
        marginRight: "65px",
    };
    const buttonDivStyle: React.CSSProperties = {
        width: "55px",
        float: "right",
    };
    const buttonStyle: React.CSSProperties = {
        minWidth: buttonDivStyle.width,
        minHeight: buttonDivStyle.width,
    };
    return (
        <div className="Input-guess">
            <form onSubmit={onSubmit}>
                <div style={buttonDivStyle}>
                    <Tooltip title="Valider">
                        <Button type="submit" variant="contained" style={{ ...buttonStyle, backgroundColor: enableButton ? blue : "" }} disabled={!enableButton}>
                            <HowToVote />
                        </Button>
                    </Tooltip>
                </div>
                <div style={inputTextStyle}>
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
                    />
                </div>
            </form>
        </div>
    );
}

export default Input;