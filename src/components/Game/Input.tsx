import React, { useState } from "react";
import { Autocomplete, TextField, Button, Tooltip } from "@mui/material";
import { Person } from "../../utils/types";
import { HowToVote, Lightbulb } from "@mui/icons-material";
import { blue, MIN_GUESS_BEFORE_HINT } from "../../utils/constants";
type InputProps = {
  handleSubmit: (e: React.FormEvent<Element>) => void;
  possibleGuessesRecord: Record<string, Person>;
  isFinished: boolean;
  setShowHint: (value: boolean) => void;
  guessesLenght: number;
};
function Input({
  handleSubmit,
  possibleGuessesRecord,
  isFinished,
  setShowHint,
  guessesLenght,
}: InputProps) {
  const [key, setKey] = useState<number>(0);
  const [inputValue, setInputValue] = React.useState("");
  const [enableButton, setEnableButton] = useState<boolean>(false);
  const [hasEnabledHint, setHasEnabledHint] = useState<boolean>(false);

  const handleInputChange = (
    e: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    if (possibleGuessesRecord[newInputValue]) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };
  const onSubmit = (e: React.FormEvent<Element>) => {
    handleSubmit(e);
    setKey(key + 1);
  };
  const enableHintButton =
    !hasEnabledHint && guessesLenght >= MIN_GUESS_BEFORE_HINT;


  const buttonStyle: React.CSSProperties = {
    minWidth: "55px",
    minHeight: "55px",
  };
  const hintButtonStyle: React.CSSProperties = {
    minWidth: "40px",
    minHeight: "40px",
    borderRadius: "50%",
    backgroundColor: enableHintButton ? "orange" : "",
    animation: enableHintButton ? 'bounce .3s infinite alternate': "",
  };
  return (
    <div className="Input-guess">
      <form
        onSubmit={onSubmit}
        style={{ flexGrow: 1, display: "flex", gap: "1em" }}
      >
        <Tooltip
          title={
            enableHintButton || hasEnabledHint
              ? "indice"
              : "encore " +
                (MIN_GUESS_BEFORE_HINT - guessesLenght) +
                " essais pour débloquer l'indice"
          }
        >
          <span style={{ display: "flex" }}>
            <Button
              type="button"
              onClick={() => {
                setShowHint(true);
                setHasEnabledHint(true);
              }}
              disabled={!enableHintButton}
              variant="contained"
              style={hintButtonStyle}
            >
              <Lightbulb />
            </Button>
          </span>
        </Tooltip>
        <Autocomplete
          id="guess-input"
          disabled={isFinished}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={Object.values(possibleGuessesRecord)
            .map((person) => person.name)
            .sort()}
          autoHighlight={true}
          renderInput={(params) => <TextField {...params} label="Rechercher" />}
          key={key} // This is the key to re-render the component
          clearOnBlur={true}
          selectOnFocus={true}
          style={{ flexGrow: 1 }}
          inputMode="none"
        />
        <Tooltip title="Valider">
          <span>
            <Button
              type="submit"
              variant="contained"
              style={{
                ...buttonStyle,
                backgroundColor: enableButton ? blue : "",
              }}
              disabled={!enableButton}
            >
              <HowToVote />
            </Button>
          </span>
        </Tooltip>
      </form>
    </div>
  );
}

export default Input;
