import React from "react";
import { Person } from "../../utils/types";
import { useIsMobile } from "../../utils/utils";

type hintProps = {
  hintType: Person["hintType"];
  hint: Person["hint"];
};

export function Hint({ hintType, hint }: hintProps) {
  const isMobile = useIsMobile();
  const defaultStyle: React.CSSProperties = {
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    height: isMobile? "30px" :"70px",
    fontSize: isMobile ? "13px" : "20px",
    maxWidth: "90%",
  };
  const hintTypeStyle: React.CSSProperties = {
    border: "1px solid black",
    borderRadius: "3px",
    backgroundColor: hintType === "quote" ? "cyan" : "orange",
    paddingLeft: "5px",
    paddingRight: "5px",
    textAlign: "center",
  };
  return (
    <div style={defaultStyle}>
      <span style={hintTypeStyle}>
        {hintType === "quote" ? "Citation" : " #Fact "}
      </span>
      <span style={{fontStyle: hintType === "quote" ? "oblique 80deg" : "normal",marginTop:'5px'}}>
          {hint}
      </span>
    </div>
  );
}
