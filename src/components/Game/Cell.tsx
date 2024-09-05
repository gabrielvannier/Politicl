import React, { useEffect } from "react";
import { ColumnName } from "../../utils/types";
import { Advice } from "./Advice";
import { partyRightnessScore, confettiColors } from "../../utils/constants";
import Confetti from "react-confetti-boom";
import { useIsMobile } from "../../utils/utils";
import { Tooltip } from "@mui/material";
import { TooltipInside } from "./tooltip_inside/TooltipInside";
import {
  mobileCellStyle,
  desktopCellStyle,
  columnWidthStyle,
} from "../../utils/style_constants";

type cellProps = {
  value: string | number | undefined;
  expectedValue: string | number;
  displayedColumn: ColumnName;
  displayOrder: number;
};
export function Cell({
  value,
  expectedValue,
  displayedColumn,
  displayOrder,
}: cellProps) {
  const isMobile = useIsMobile();
  const [shouldDisplay, setShouldDisplay] = React.useState(false);
  const [displayConfeti, setDisplayConfeti] = React.useState<
    boolean | undefined
  >(undefined);
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    setTimeout(() => setShouldDisplay(true), 700 * displayOrder - 650);
  }, [value, displayOrder]);

  const cellStyle = {
    ...(isMobile ? mobileCellStyle : desktopCellStyle),
    ...columnWidthStyle[displayedColumn],
    opacity: shouldDisplay ? "1" : "0",
  };
  const emptyStyle = {
    ...cellStyle,
    background: "#dcdcdc",
    color: "#dcdcdc",
    opacity: "0.5",
  };

  if (value === undefined || shouldDisplay === false) {
    return (
      <span className="Cell-empty" style={emptyStyle}>
        .
      </span>
    );
  }
  const isCorrect = value === expectedValue;
  const correctStyle = {
    ...cellStyle,
    background: "#8df38d",
    color: "#000000",
  };
  const incorrectStyle = {
    ...cellStyle,
    background: "#da7373",
    color: "#ffffff",
  };
  // display confetti if the name is correct (means game is won)
  if (isCorrect && displayedColumn === "name" && displayConfeti === undefined) {
    setDisplayConfeti(true);
    setTimeout(() => setDisplayConfeti(false), 1000);
  }

  //if the party is almost correct, display a different orange color
  if (displayedColumn === "party") {
    if (
      partyRightnessScore[value as keyof typeof partyRightnessScore] ===
      partyRightnessScore[expectedValue as keyof typeof partyRightnessScore]
    ) {
      incorrectStyle.background = "#f5d142";
      incorrectStyle.color = "#000000";
    }
  }

  return (
    <Tooltip
      enterTouchDelay={200}
      title={
        displayedColumn != "name" &&
        displayedColumn != "sexe" && (
          <TooltipInside
            guessedValue={value}
            expectedValue={expectedValue}
            displayedColumn={displayedColumn}
          />
        )
      }
    >
      <span
        className="Filled-Cell"
        style={isCorrect ? correctStyle : incorrectStyle}
      >
        {displayConfeti && (
          <Confetti
            mode={"boom"}
            effectCount={3}
            particleCount={160}
            colors={confettiColors}
          />
        )}
        {value}
        <Advice
          value={value}
          expectedValue={expectedValue}
          displayedColumn={displayedColumn}
        />
      </span>
    </Tooltip>
  );
}
