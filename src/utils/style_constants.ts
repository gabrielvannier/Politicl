export const cellDefaultStyle = {
    border: "1px solid black",
    borderRadius: "10px",
    fontSize: "calc(1vw + 8px)",
    display: "flex",
  };

export const mobileCellStyle: React.CSSProperties = {
    ...cellDefaultStyle,
    height: "calc(14vw + 5px)",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingTop: "5px",
    paddingBottom: "5px",
  };
  
export const desktopCellStyle: React.CSSProperties = {
    ...cellDefaultStyle,
    justifyContent: "center",
    alignItems: "center",
    height: "calc(4.5vw)",
  };
  
export const columnWidthStyle = {
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
  