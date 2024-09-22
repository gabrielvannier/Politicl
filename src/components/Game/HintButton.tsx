import React from "react";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";

type HintButtonProps = {
  setShowHint: (value: boolean) => void;
  guessesLenght: number;
  requiredGuesses: number;
  icon: React.ReactNode;
};

export function HintButton({
  setShowHint,
  guessesLenght,
  requiredGuesses,
  icon,
}: HintButtonProps) {
  const [hasActivateddHint, setHasActivatedHint] = useState<boolean>(false);
  const enabled = guessesLenght >= requiredGuesses;

  const hintButtonStyle: React.CSSProperties = {
    minWidth: "55px",
    minHeight: "55px",
    animation: (enabled && !hasActivateddHint) ? "bounce .3s infinite alternate" : "",
    borderRadius: "50%",
    backgroundColor: enabled ? "orange" : "",
  };

  return (
    <Tooltip
      className="HintButton"
      title={
        enabled
          ? "indice"
          : "encore " +
            (requiredGuesses - guessesLenght) +
            " essais pour débloquer l'indice"
      }
      style={{ display: "flex", alignItems: "center" }}
    >
      <span>
        <Button
          type="button"
          onClick={() => {
            setShowHint(true);
            setHasActivatedHint(true);
          }}
          disabled={!enabled}
          variant="contained"
          style={hintButtonStyle}
        >
          {icon}
        </Button>
      </span>
    </Tooltip>
  );
}
