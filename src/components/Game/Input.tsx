import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Tooltip,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Person } from "../../utils/types";
import { HowToVote, Lightbulb } from "@mui/icons-material";
import { blue, MIN_GUESS_BEFORE_HINT } from "../../utils/constants";
import { useIsMobile } from "../../utils/utils";
type InputProps = {
  handleSubmit: (name: string) => void;
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

  useEffect(() => {
    if (possibleGuessesRecord[inputValue]) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [inputValue, possibleGuessesRecord]);
  const onSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    handleSubmit(inputValue);
    setInputValue("");
    setKey(key + 1);
  };
  const isMobile = useIsMobile();
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
    animation: enableHintButton ? "bounce .3s infinite alternate" : "",
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
        {isMobile ? (
          <FormControl style={{ flexGrow: 1 }}>
            <InputLabel id="guess-select-label">Rechercher</InputLabel>
            <Select
              labelId="guess-select-label"
              id="guess-select"
              disabled={isFinished}
              value={inputValue}
              onChange={(e: SelectChangeEvent) => setInputValue(e.target.value)}
            >
              {Object.values(possibleGuessesRecord)
                .map((person) => person.name)
                .sort()
                .map((personName) => (
                  <MenuItem key={personName} value={personName}>
                    {personName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : (
          <Autocomplete
            id="guess-autocomplete"
            disabled={isFinished}
            inputValue={inputValue}
            onInputChange={(event, value) => setInputValue(value)}
            options={Object.values(possibleGuessesRecord)
              .map((person) => person.name)
              .sort()}
            renderInput={(params) => (
              <TextField {...params} label="Rechercher" />
            )}
            key={key} // This is the key to re-render the component
            style={{ flexGrow: 1 }}
          />
        )}
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
