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
import { HintButton } from "./HintButton";
import { Person } from "../../utils/types";
import { HowToVote, Lightbulb, Image } from "@mui/icons-material";
import {
  blue,
  MIN_GUESS_BEFORE_TEXT_HINT,
  MIN_GUESS_BEFORE_IMG_HINT,
} from "../../utils/constants";
import { useIsMobile } from "../../utils/utils";
type InputProps = {
  handleSubmit: (name: string) => void;
  possibleGuessesRecord: Record<string, Person>;
  isFinished: boolean;
  setShowTextHint: (value: boolean) => void;
  setShowImgHint: (value: boolean) => void;
  guessesLenght: number;
};
function Input({
  handleSubmit,
  possibleGuessesRecord,
  isFinished,
  setShowTextHint,
  setShowImgHint,
  guessesLenght,
}: InputProps) {
  const [key, setKey] = useState<number>(0);
  const [inputValue, setInputValue] = React.useState("");
  const [enableButton, setEnableButton] = useState<boolean>(false);

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

  const inputDivStyle: React.CSSProperties = {
      width: '50%',
      minWidth: '330px',
      height: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: isMobile? "column-reverse" : "row",
      marginTop: isMobile? '100px' : '0px',
      alignItems: 'center',
      alignContent: 'center',
      gap: '10px',
    }

  const buttonStyle: React.CSSProperties = {
    minWidth: "55px",
    minHeight: "55px",
  };
  return (
    <div className="Input-guess" style={inputDivStyle}>
      <div className="Hint-buttons" style={{display:"flex", justifyContent:"space-evenly",width:isMobile? '70%': '30%'}}>
        <HintButton
          setShowHint={setShowImgHint}
          guessesLenght={guessesLenght}
          requiredGuesses={MIN_GUESS_BEFORE_IMG_HINT}
          icon={<Image />}
        />
        <HintButton
          setShowHint={setShowTextHint}
          guessesLenght={guessesLenght}
          requiredGuesses={MIN_GUESS_BEFORE_TEXT_HINT}
          icon={<Lightbulb />}
        />
      </div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection:"row", flexGrow: 1, gap: "10px", width: "100%" }}
      >
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
