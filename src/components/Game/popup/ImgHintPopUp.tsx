import React from "react";
import { PopUp } from "./PopUp";

type imgHintPopUpProps = {
  imgSrc: string;
  setShowHint: (value: boolean) => void;
};

export function ImgHintPopUp({ imgSrc, setShowHint }: imgHintPopUpProps) {

  return (
    <PopUp
      title={<span/>}
      description={
        <div>
          <img
            src={imgSrc}
            alt="imgHint"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      }
      handleClose={() => {
        setShowHint(false);
      }}
      open={true}
    ></PopUp>
  );
}
