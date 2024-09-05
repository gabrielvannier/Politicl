import React from "react";
import { ColumnName } from "../../utils/types";
import { partyTraduction } from "../../utils/constants";
import { useIsMobile } from "../../utils/utils";
import { columnWidthStyle } from "../../utils/style_constants";

function ColumnHeadline({ displayedColumn }: { displayedColumn: ColumnName }) {
  const isMobile = useIsMobile();
  const defaultStyle = {
    ...columnWidthStyle[displayedColumn],
    lineHeight: "15px",
    fontSize: "calc(1vw + 4px)",
  };
  // artificialy augment the size of the birthDate column
  if (displayedColumn === "birthDate" && isMobile) {
    defaultStyle.width = "12%";
  }
  return <span style={defaultStyle}>{partyTraduction[displayedColumn]} :</span>;
}

export function ColumnHeadlines() {
  return (
    <div
      className="Column-headlines"
      style={{
        display: "flex",
        gap: "1%",
        maxWidth: "1200px",
        width: "97%",
        justifyContent: "space-evenly",
        margin: "1vw",
        alignItems: "center",
      }}
    >
      <ColumnHeadline displayedColumn="sexe" />
      <ColumnHeadline displayedColumn="highestRole" />
      <ColumnHeadline displayedColumn="party" />
      <ColumnHeadline displayedColumn="birthDate" />
      <ColumnHeadline displayedColumn="name" />
    </div>
  );
}
