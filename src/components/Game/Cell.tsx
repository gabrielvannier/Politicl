import React from "react";
import { ColulmnName } from "../../utils/types";
import { Advice } from "./Advice";
import {
  partyRightnessScore,
  partyTraduction,
  confettiColors,
} from "../../utils/constants";
import Confetti from "react-confetti-boom";
import { useIsMobile } from "../../utils/utils";

type cellProps = {
  value: string | number | undefined;
  expectedValue: string | number;
  displayedColumn: ColulmnName;
  displayOrder: number;
};
const communDefaultStyle = {
  border: "1px solid black",
  borderRadius: "10px",
  fontSize: "calc(1vw + 7px)",
  display: "flex",
};
const columnStyle = {
  name: {
    width: "25%",
  },
  sexe: {
    width: "10%",
  },
  highestRole: {
    width: "20%",
  },
  birthDate: {
    width: "10%",
  },
  party: {
    width: "30%",
  },
};

function ColumnHeadline({ displayedColumn }: { displayedColumn: ColulmnName }) {
  const defaultStyle = {
    ...columnStyle[displayedColumn],
    lineHeight: "15px",
    display: "inline-block",
    fontSize: "16px",
    //border: "1px solid black",
    //margin: "5px",
  };
  return <p style={defaultStyle}>{partyTraduction[displayedColumn]} :</p>;
}

export function ColumnHeadlines() {
  return (
    <div className="Column-headlines">
      <ColumnHeadline displayedColumn="sexe" />
      <ColumnHeadline displayedColumn="highestRole" />
      <ColumnHeadline displayedColumn="party" />
      <ColumnHeadline displayedColumn="birthDate" />
      <ColumnHeadline displayedColumn="name" />
    </div>
  );
}

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
  React.useEffect(() => {
    if (value === undefined) {
      return;
    }
    setTimeout(() => setShouldDisplay(true), 700 * displayOrder - 650);
  }, [value, displayOrder]);

  const mobileStyle: React.CSSProperties = {
    ...communDefaultStyle,
    ...columnStyle[displayedColumn],
    height: "calc(14vw + 5px)",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingTop: "5px",
    paddingBottom: "5px",
  };
  const desktopStyle: React.CSSProperties = {
    ...communDefaultStyle,
    ...columnStyle[displayedColumn],
    justifyContent: "center",
    alignItems: "center",
    height: "calc(4.5vw)",
  };

  if (value === undefined || shouldDisplay === false) {
    const emptyStyle = {
      ...(isMobile ? mobileStyle : desktopStyle),
      background: "#dcdcdc",
      color: "#dcdcdc",
      opacity: "0.5",
      //disable display
    };
    return (
      <span className="Cell-empty" style={emptyStyle}>
        .
      </span>
    );
  }
  const isCorrect = value === expectedValue;

  if (isCorrect) {
    const correctStyle = {
      ...(isMobile ? mobileStyle : desktopStyle),
      background: "#8df38d",
      color: "#000000",
      opacity: shouldDisplay ? "1" : "0",
    };
    if (displayedColumn === "name" && displayConfeti === undefined) {
      setDisplayConfeti(true);
      setTimeout(() => setDisplayConfeti(false), 1000);
    }

    return (
      <span style={correctStyle}>
        {value}
        {displayConfeti && (
          <Confetti
            mode={"boom"}
            effectCount={3}
            particleCount={160}
            colors={confettiColors}
          />
        )}
        <Advice
          value={value}
          expectedValue={expectedValue}
          displayedColumn={displayedColumn}
        />
      </span>
    );
  }
  const incorrectStyle = {
    ...(isMobile ? mobileStyle : desktopStyle),
    background: "#da7373",
    color: "#ffffff",
    opacity: shouldDisplay ? "1" : "0",
  };
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
    <span style={incorrectStyle}>
      {value}
      <Advice
        value={value}
        expectedValue={expectedValue}
        displayedColumn={displayedColumn}
      />
    </span>
  );
}
