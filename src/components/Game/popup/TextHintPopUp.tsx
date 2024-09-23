import React from "react";
import { Person } from "../../../utils/types";
import { useIsMobile } from "../../../utils/utils";
import { PopUp } from "./PopUp";

type textHintPopUpProps = {
  hintType: Person["hintType"];
  hint: Person["hint"];
  setShowHint: (value: boolean) => void;
};

export function TextHintPopUp({ hintType, hint, setShowHint }: textHintPopUpProps) {
  const isMobile = useIsMobile();
  const defaultStyle: React.CSSProperties = {
    textAlign: "center",
    height: isMobile ? "30px" : "70px",
    fontSize: isMobile ? "15px" : "20px",
    maxWidth: "90%",
    margin: "auto",
    marginTop: "30px",
  };
  const hintTypeStyle: React.CSSProperties = {
    border: "1px solid black",
    borderRadius: "3px",
    fontSize: isMobile ? "20px" : "25px",
    backgroundColor: hintType === "quote" ? "cyan" : "orange",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: "center",
    margin:"auto"
  };
  return (
    <PopUp
      title={
        <span style={hintTypeStyle}>
          {hintType === "quote" ? "Citation" : " #Fact "}
        </span>
      }
      description={
        <div
          style={{
            ...defaultStyle,
            fontStyle: hintType === "quote" ? "oblique 80deg" : "normal",
          }}
        >
          {hint}
        </div>
      }
      handleClose={() => {
        setShowHint(false);
      }}
      open={true}
    ></PopUp>
  );
}
